import {Sequelize} from 'sequelize-typescript'
import { config } from './config/config'

const con = config.dev;

// Instantiat new Wequelize instance
 export const sequelize = new Sequelize({
     "username": con.username,
     "password": con.password,
     "database": con.database,
     "host": con.host,
     "dialect": "postgres",
     "storage": "memory"
 })