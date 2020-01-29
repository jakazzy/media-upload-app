import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = 8082

app.use(bodyParser.json())
app.get('/', (req: Request, res:Response)=>{
    res.send('welcome to the application')
})



app.listen(port, ()=>{
    console.log('app running at port number 8082')
    console.log('shutdown server using CTRL + C')
})

