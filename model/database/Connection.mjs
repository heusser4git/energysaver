import mysql from 'mysql';
import fs from 'fs';



export default class Connection {
    password;
    user;
    database;
    host;
    port;
    constructor(secretfile, path='') {
        let newpath = './model/secretdata/';
        if(path.length>0) {
            newpath = path;
        }
        try {
            const data = fs.readFileSync(newpath+secretfile, 'utf-8');
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
        return mysql.createPool({
            connectionLimit: 100,
            password: this.password,
            user: this.user,
            database: this.database,
            host: this.host,
            port: this.port
        });
    }
}