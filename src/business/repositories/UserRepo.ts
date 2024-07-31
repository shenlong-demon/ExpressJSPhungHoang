import { UserEntity } from './model';
import { LoginRequest } from '../model/request';
import { Logger } from '../../core/common';
import { prisma } from '../../../prisma/PrismaClient';
import { DateTimeUtils } from '@business/common';

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
				phone: req.phone,
				password: req.password,
			},
		});
		Logger.log(() => [`UserRepo getByPhoneAndPassword`, req, user]);
		return user;
	}

	static async setToken(id: number, token: string): Promise<void> {
		const updateUser = await prisma.phuser.update({
			where: {
				id,
			},
			data: {
				token,
				updatedAt: DateTimeUtils.now(),
			},
		});
	}
}
