import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = 8082

app.use(bodyParser.json())
app.get('/', (req: Request, res:Response)=>{
    res.send('welcome to the application')
})

app.get('/api/v0/feeds', (req: Request, res:Response)=>{
    res.send('Provide the details for all the feeds')
})

app.get('/api/v0/feeds/:id', (req:Request, res:Response)=>{
    const {id }= req.params

    res.send(`Provide details with feed of number ${id}`)
})
app.patch('/api/v0/feeds/:id', (req:Request, res:Response)=>{
    const {id }= req.params

    res.send(`Provide details with feed of number ${id}`)
})

app.post('/api/v0/feeds', (req:Request, res:Response)=>{
    res.send('Post this data')
})

app.get('/signed-url/:fileName', 
 
    async (req: Request, res: Response) => {})
app.listen(port, ()=>{
    console.log('app running at port number 8082')
    console.log('shutdown server using CTRL + C')
})

