import { Router, Request, Response } from 'express'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { NextFunction } from 'connect'
import * as EmailValidator from 'email-validator'
import { User } from '../models/User'
import  { config } from '../../../../config/config'

const router: Router = Router()

async function generatePassword(plainTextPassword: string): Promise<string> {
    const saltRounds= 10
    const salt = await bcrypt.genSalt(saltRounds)
    return await bcrypt.hash(plainTextPassword, salt)
}

async function comparePasswords(plainTextPassword: string, hash: string): Promise<boolean>{
    return await bcrypt.compare(plainTextPassword, hash)
}

function generateJWT(user: User): string{
    return jwt.sign(user.toJSON(), config.dev.jwt.secret)
}

export function requireAuth(req: Request, res: Response, next: NextFunction){
    if(!req.headers || !req.headers.authorization){
    return res.status(401).send({message: 'No authorization headers.'})}

    const token_bearer = req.headers.authorization.split(' ')
    if(token_bearer.length !== 2){
        return res.status(402).send({message: 'Malformed token'})
    }
    const token = token_bearer[1]

    return jwt.verify(token, config.dev.jwt.secret, (err, decoded)=>{
        if(err){
            return res.status(500).send({auth:false, message:"Failed to authenticate"})
        }
        return next()
    } )
}

router.get('/verification', requireAuth, async(req: Request, res: Response)=>{
    return res.status(200).send({auth: true, message:'Authenticated.'})
})

router.post('/login', async(req: Request, res:Response)=>{
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !EmailValidator.validate(email)){
        return res.status(400).send({auth:false, message:'Email is required or malformed'})
    }

    if(!password){
        return res.status(400).send({auth:false, message:'Password is required'})
    }

   const user =await User.findByPk(email)

   if(!user){
       return res.status(401).send({auth:false, message:'Anauthorized'})
   }

   const authValid = await comparePasswords(password, user.password_hash)
   
   if(!authValid){
       return res.status(401).send({auth:false, message:'unauthorized'})
   }

   const jwt = generateJWT(user)
   return res.status(200).send({auth: true, token:jwt, user:user.short()})
})

// REgister a new user
router.post('/', async(req: Request, res: Response) =>{
   const { email, plainTextPassword } = req.body

   if(!email || !EmailValidator.validate(email)){
       return res.status(400).send({auth:false, message:'Email is required or malformed'})
   }

   if(!plainTextPassword){
       return res.status(400).send({auth:false, message:"Password is required"})
   }

   const user = await User.findByPk(email)
   if(user){
       return res.status(422).send({auth:false, message: "User may already exist"})
   }

   const password_hash = await generatePassword(plainTextPassword)

   const newUser = await new User({
       email:email,
       password_hash:password_hash
   })

   let savedUser
   try{
       savedUser = await newUser.save()
   }catch(e){
       throw e
   }
})

router.get('/', async(req:Request, res: Response) =>{
    res.send('auth')
})

export const AuthRouter: Router = router