import Connection from '../Connection.mjs';
import {Device} from '../../Device.mjs';

export class Repository {
    connection;
    pool;
    constructor(file='dbDevice.json', path=null) {
        if(path != null) {
            this.connection = new Connection(file, path);
        } else {
            this.connection = new Connection(file);
        }
        this.pool = this.connection.pool();
    }
    getRawDeviceData(filter) {
        let query = '';
        // from-to with timestamp
        let sql = 'SELECT * FROM tblDevice';
        query = sql + ' ORDER BY name';

        if (query.length > 10) {
            return new Promise((resolve, reject) => {
               this.pool.query(query, (error, elements) => {
                    if (error) {
                        return reject(error);
                    }
                   return resolve(elements);
                });
            });
        }
    }

    async getDeviceData(filter) {
        const rows = await this.getRawDeviceData(filter);
        let devicedata = [];
        for (let entry of rows) {
            devicedata.push(this.hlpDbdataToDevicedata(entry));
        }
        return devicedata;
    }

    hlpDbdataToDevicedata(entry) {
        let device = new Device();
        device.setId(entry.id);
        device.setName(entry.name);
        device.setPower(entry.power);
        console.log(device)

        return device;
    }
}

