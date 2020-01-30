import { Router, Request, Response } from 'express'
import { FeedItem } from '../models/FeedItem'
import { requireAuth } from '../../users/routes/auth.router'
// import * as AWS from '../../../../aws'

const router: Router = Router()

// Get all feed items

// Ger a specific resource by primary key

// update a specific resource

// Get a signedurl to put a new item in the bucket 