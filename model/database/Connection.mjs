import mysql from 'mysql2';
import fs from 'fs';



export default class Connection {
    password;
    user;
    database;
    host;
    port;
    constructor(secretfile, path='./model/secretdata/') {
        try {
            const data = fs.readFileSync(path+secretfile, 'utf-8');
            const obj = JSON.parse(data);
            this.password = obj.password;
            this.user = obj.user;
            this.database = obj.database;
            this.host = obj.host;
            this.port = obj.port;
        } catch(error) {
            console.error(error);
        }
        this.mysql = mysql;
    }

    pool() {
        //console.log('DB-Pool startet: ' + this.database)
        return mysql.createPool({
            connectionLimit: 10,
            password: this.password,
            user: this.user,
            database: this.database,
            host: this.host,
            port: this.port
        });
    }
}