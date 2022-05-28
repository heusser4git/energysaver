import * as assert from "assert";
import {Querygenerator} from "../model/query/Querygenerator.mjs";
describe("Querygenerator", function (){
    describe("generateParams: ", function (){
        const gen = new Querygenerator('testtable');

        const param = gen.generateParams('id', '%_%', 234);
        assert.strictEqual(param.name, 'id');
        assert.strictEqual(param.eq, '%_%');
        assert.strictEqual(param.value, 234);

        const filter = gen.generateFilterQuery([param]);
        assert.strictEqual(filter[0], 'SELECT * FROM testtable WHERE id LIKE ?');
        assert.strictEqual(filter[1][0], '%234%');

        const condition = gen.queryCondition([param]);
        assert.strictEqual(condition[0][0], 'id LIKE ?');
        assert.strictEqual(condition[1][0], '%234%');
    });
});