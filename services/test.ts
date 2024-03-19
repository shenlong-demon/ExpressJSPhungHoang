import {Dto} from "./dto";
const db = require('../repositories/db')
async function test(): Promise<Dto> {
    const rows = await db.query(
        'SELECT* FROM quote', []
    );

    return {

    }
}


module.exports = {
    test,
}