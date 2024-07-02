import { PrismaClient } from '@prisma/client'
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient()
async function main() {
    const user1 = await prisma.phuser.upsert({
        where: { phone: '0905690200 '},
        update: {},
        create: {
            name: 'long',
            phone: '0905690200',
            password: '123456',
            appKey: uuidv4()
        },
    })
    const brand1 = await prisma.phbrand.upsert({
        where: { id: 1},
        update: {},
        create: {
            name: 'yamaha'
        },
    })

    const group1 = await prisma.phgroup.upsert({
        where: { id: 1},
        update: {},
        create: {
            name: 'manh'
        },
    })

    const product1 = await prisma.phproduct.upsert({
        where: { id: 1},
        update: {},
        create: {
            code: 'ma_ya_1',
            name: 'manh yamaha',
            otherName: '',
            image: '',
            price: 10.0,
            quantity: 10,
            brandId: 1,
            groupId: 1
        },
    })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
