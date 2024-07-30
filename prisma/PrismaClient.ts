import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';

export let prisma: PrismaClient;
export const init = (d1: any): void => {
	prisma = new PrismaClient({
		adapter: new PrismaD1(d1),
	});
};
