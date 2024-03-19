import {UserEntity} from "./model";
import { PrismaClient } from '@prisma/client'
import {Logger} from "../common";
const prisma = new PrismaClient();
export class UserRepo {

    // static async createUser(phone: string, password: string) : Promise<any>{
    //     const query = {
    //         text: `INSERT INTO users (name, phone, password, token, status) VALUES ($1, $2,$3, $4, $5)`,
    //         values: [phone, phone, password,'', 1],
    //     };
    //     return DB.insert(query);
    // }

    static async getByPhoneAndPassword(phone: string, password: string): Promise<UserEntity | null> {
        // Query returns User or null
        const user: UserEntity | null = await prisma.users.findFirst({
            where: {
                phone,
                password
            },
        })
        Logger.log(() => [`UserRepo getByPhoneAndPassword`, phone, password, user]);
        return user;
    }

    static async setToken(id: number, token: string): Promise<void> {
        const updateUser = await prisma.users.update({
            where: {
               id
            },
            data: {
                token
            },
        });
    }
}