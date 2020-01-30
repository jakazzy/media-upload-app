import express, { Request, Response} from 'express'
import { sequelize} from './sequelize'
import bodyParser from 'body-parser'
import { IndexRouter } from './controllers/v0/index.router'
import { V0MODELS } from './controllers/v0/model.index'
import {NextFunction } from 'connect'

(async ()=>{
    await sequelize.addModels(V0MODELS)
    await sequelize.sync()

    const app = express()
    const port = process.env.PORT || 8080
    const restrictCors=(req:Request, res:Response, next:NextFunction)=>{
        res.header("Access-Control-Allow-Origin", "http://localhost:8100")
        res.header("Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization")
        next()
    }

    app.use(bodyParser.json())
    app.use(restrictCors)
    app.use('/api/v0', IndexRouter)

    app.get('/', async(req:Request, res:Response)=>{
        res.send("api/v0")
    })

    app.listen(port, ()=>{
        console.log( `server running http://localhost:${ port }` );
        console.log( `press CTRL+C to stop server` );
    })
})()