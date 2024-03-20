import {GroupEntity} from "./model";
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();
export class GroupRepo {
    static async update(id: number, name: string, status: number): Promise<GroupEntity | null> {
        const group: GroupEntity | null = await prisma.groups.update({
            where: {
                id
            },
            data: {
                name,
                status
            },
        })
        return group;
    }

    static async create(name: string, status: number): Promise<GroupEntity | null> {
        const group: GroupEntity | null = await prisma.groups.create({
            data: {
                name, status
            }
        });
        return group;
    }

    static async getGroups(): Promise<GroupEntity[]> {
        const groups: GroupEntity[] = await prisma.groups.findMany();
        return groups;
    }
}
