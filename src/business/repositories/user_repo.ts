import {UserEntity} from "./model";
import { PrismaClient } from '@prisma/client'
import {Logger, STATUS} from "../common";
import {LoginRequest} from "@business/model/request";
const prisma = new PrismaClient();
export class UserRepo {

    // static async createUser(phone: string, password: string) : Promise<any>{
    //     const query = {
    //         text: `INSERT INTO users (name, phone, password, token, status) VALUES ($1, $2,$3, $4, $5)`,
    //         values: [phone, phone, password,'', 1],
    //     };
    //     return DB.insert(query);
    // }

    static async getByPhoneAndPassword(req: LoginRequest): Promise<UserEntity | null> {
        // Query returns User or null
        const user: UserEntity | null = await prisma.phuser.findFirst({
            where: {
                phone:req.phone,
                password:req.password,
            },
        })
        Logger.log(() => [`UserRepo getByPhoneAndPassword`, phone, password, user]);
        return user;
    }

    static async setToken(id: number, token: string): Promise<void> {
        const updateUser = await prisma.phuser.update({
            where: {
               id
            },
            data: {
                token
            },
        });
    }
}
