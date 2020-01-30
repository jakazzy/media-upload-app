import { Router, Request, Response } from 'express'
import { FeedItem } from '../models/FeedItem'
import { requireAuth } from '../../users/routes/auth.router'
import * as AWS from '../../../../aws'

const router: Router = Router()

// Get all feed items
router.get('/', async(req:Request, res:Response)=>{
    const items = await FeedItem.findAndCountAll({order:[['id', 'DESC']]})
    console.log(items, 'i want to see the rows')
    items.rows.map((item)=>{
        if(item.url){
            item.url = AWS.getGetSignedUrl(item.url)
        }
    })
    res.send(items)
})

// Ger a specific resource by primary key
router.get('/:id', async(req:Request, res: Response)=>{
    const { id } = req.params
    const item = await FeedItem.findByPk(id)
    if(!item){return res.status(400).send({message: "Item cannot be found"})}
    return res.status(200).send(item)
})

// update a specific resource
router.patch('/:id', async(req:Request, res:Response)=>{
    const { id } = req.params
    if(!id) { return res.status(400).send({message: 'Item is required'})}
    const item =await FeedItem.update({url:'this is a url'}, {where: {id:id}})
    return res.status(200).send({message:'url successfully updated'})
})

// Get a signedurl to put a new item in the bucket 
router.get('/signed-url/:filename', requireAuth, async(req:Request, res:Response)=>{

    const { filename }= req.params
    const url = AWS.getPutSignedUrl(filename)
    res.status(201).send({url:url})
})

// Post metadata and the filename after the file is uploaded
// Note the file name is the key name in the s3 bucker
// body:{caption:string, filename: string}

router.post('/', requireAuth, async(req: Request, res:Response)=>{
    const caption = req.body.caption
    const fileName = req.body.url

    // check caption is valid
    if (!caption){
        return res.status(400).send({message: 'Caption is required or malformed'})
    }

    if(!fileName){
        return res.status(400).send({ message: 'File url is required'})
    }

    const item = await new FeedItem({
        caption:caption,
        url:fileName
    })
    const saved_item = await item.save()
    saved_item.url = AWS.getGetSignedUrl(saved_item.url)
    return res.status(201).send(saved_item)
})
export const FeedRouter: Router = router;