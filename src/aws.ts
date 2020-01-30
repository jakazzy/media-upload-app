import AWS from 'aws-sdk'
import { config } from './config/config'

const con = config.dev

if(con.aws_profile !== "DEPLOYED"){
    const credentials = new AWS.SharedIniFileCredentials({profile: 'default'})
    AWS.config.credentials = credentials
}

const credentials = new AWS.SharedIniFileCredentials({profile: con.aws_profile})
AWS.config.credentials = credentials
export const s3 = new AWS.S3({
    signatureVersion:'v4',
    region: con.aws_region,
    params: {Bucket: con.aws_media_bucket}

})

/* getGetSignedUrl generates an aws signed url to retreive an item
 * @Params
 *    key: string - the filename to be put into the s3 bucket
 * @Returns:
 *    a url as a string
 */

 export function getGetSignedUrl( key: string): string{
     const signedUrlExpireSeconds = 60 * 5
     const url = s3.getSignedUrl('getObject', {
         Bucket: con.aws_media_bucket,
         Key: key,
         Expires: signedUrlExpireSeconds
     })
     return url
 }


 /* getPutSignedUrl generates an aws signed url to put an item
 * @Params
 *      key: string - the filename to be retrieved from the s3 bucket
 * @Returns
 *  a url as a string
 * */

 export function getPutSignedUrl( key: string): string{
     const signedUrlExpireSeconds = 60 *5
     const url = s3.getSignedUrl('putObject',{
         Bucket: con.aws_media_bucket,
         key: key,
         Expires: signedUrlExpireSeconds
     })
     return url
 }