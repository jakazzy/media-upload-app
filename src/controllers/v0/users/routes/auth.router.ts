import { Router, Request, Response } from 'express'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { NextFunction } from 'connect'
import * as EmailValidator from 'email-validator'
import { User } from '../models/User'
import  { config } from '../../../../config/config'

const router: Router = Router()

async function generatePassword(plainTextPassword: string): Promise<string> {
    return
}

async function comparePasswords(plainTextPassword: string, hash: string): Promise<boolean>{
    return
}

function generateJWT(user: User): string{
    return
}

export function requireAuth(req: Request, res: Response, next: NextFunction){
    return
}

router.get('/verification', requireAuth, async(req: Request, res: Response)=>{
    return res.status(200).send({auth: true, message:'Authenticated.'})
})

router.post('/login', async(req: Request, res:Response)=>{
    const email = req.body.email;
    const password = req.body.password;
    return
})

// REgister a new user
router.post('/', async(req: Request, res: Response) =>{
    return
})

router.get('/', async(req:Request, res: Response) =>{
    res.send('auth')
})

export const AuthRouter: Router = router