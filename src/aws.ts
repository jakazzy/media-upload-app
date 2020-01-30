import AWS from 'aws-sdk'
import { config } from './config/config'

const con = config.dev

if(con.aws_profile !== "DEPLOYED"){
    const credentials = new AWS.SharedIniFileCredentials({profile: 'default'})
    AWS.config.credentials = credentials
}