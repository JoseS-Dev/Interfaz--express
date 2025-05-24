import {createConnection} from 'mysql2/promise';

export const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'Users',
    port: 3306
})