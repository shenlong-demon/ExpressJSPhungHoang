import {Logger} from "../common";

const { Pool } = require('pg');
const config = require('../config');
const pool = new Pool(config.db);

/**
 * Query the database using the pool
 * @param {*} query
 * @param {*} params
 *
 * @see https://node-postgres.com/features/pooling#single-query
 */
export class DB {
    static readonly PAGING: number = 20;
    static async first(query: string, params: any): Promise<any | null> {
        const entities: any[] = await DB.query(query, params);
        const entity : any | null = entities.length > 0 ? entities[0] : null;
        Logger.log(() => [`DB.first `, query, params, entities, entity]);
        return entity;
    }
    static async query(query: string, params: any): Promise<any[]> {
        const {rows, fields} = await pool.query(query, params);
        if (!rows) {
            return [];
        }
        return rows;
    }
    static async find(query: any): Promise<any[]> {
        const {rows, fields} = await pool.query(query);
        if (!rows) {
            return [];
        }
        return rows;
    }
    static async insert(query: any): Promise<any> {
        const {rows, fields} = await pool.query(query);
        Logger.log(() => [`DB.insert `, query, rows, fields]);

        return !!rows && rows.length > 0 ? rows[0]: null;
    }
    static async update(query: any): Promise<any> {
        const {rows, fields} = await pool.query(query);
        Logger.log(() => [`DB.update `, query, rows, fields]);

        return !!rows && rows.length > 0 ? rows[0]: null;
    }
}
