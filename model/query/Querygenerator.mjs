/**
 * Mit freundlicher Hilfe von:
 * https://stackoverflow.com/questions/31822891/how-to-build-dynamic-query-by-binding-parameters-in-node-js-sql
 */
export class Querygenerator {
    table;
    query;
    constructor(table, query='') {
        this.table = table;
        this.query = query;
    }
    generateParams = (name, eq, value) => {
        return {
            name: name,
            eq: eq, // %_%, %_, _%, =, >, <, !=,
            value: value
        }
    }

    generateFilterQuery = (params) => {
        let conditions, values = []
        let conditionsStr;

        if (params.length == 0) {
            return false
        }

        [conditions, values] = this.queryCondition(params)

        let build = {
            where: conditions.length ?
                conditions.join(' AND ') : '1',
            values: values
        };
        let query = '';
        if(this.query.length>0) {
            query = this.query + " " + build.where;
        } else {
            query = `SELECT * FROM ${this.table} WHERE ${build.where}`;
        }
        return [query, build.values]
    }


    queryCondition = (params) => {
        let conditions = [];
        let values = [];

        params.forEach(item => {
            switch (item.eq) {
                case '=': {
                    conditions.push(item.name + " = ?");
                    values.push(item.value);
                    break;
                }
                case '!=': {
                    conditions.push(item.name + " != ?");
                    values.push(item.value);
                    break;
                }
                case '<': {
                    conditions.push(item.name + " < ?");
                    values.push(item.value);
                    break;
                }
                case '>': {
                    conditions.push(item.name + " > ?");
                    values.push(item.value);
                    break;
                }
                case '%_%': {
                    conditions.push(item.name + " LIKE ?");
                    values.push("%" + item.value + "%");
                    break;
                }
                case '%_': {
                    conditions.push(item.name + " LIKE ?");
                    values.push("%" + item.value);
                    break;
                }
                case '_%': {
                    conditions.push(item.name + " LIKE ?");
                    values.push(item.value + "%");
                    break;
                }
                case '_': {
                    conditions.push(item.name + " LIKE ?");
                    values.push(item.value + "");
                    break;
                }
            }
        });
        return [conditions, values]
    }
}