import {createConnection} from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const connection = await createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'users',
    port: process.env.DB_DATABASE_PORT || 3306,
    decimalNumbers: true 
})