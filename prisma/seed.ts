import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const user1 = await prisma.users.upsert({
        where: { phone: '0905690200 '},
        update: {},
        create: {
            name: 'long',
            phone: '0905690200',
            password: '123456'
        },
    })
    const brand1 = await prisma.brands.upsert({
        where: { id: 1},
        update: {},
        create: {
            name: 'yamaha'
        },
    })

    const group1 = await prisma.groups.upsert({
        where: { id: 1},
        update: {},
        create: {
            name: 'manh'
        },
    })

    const product1 = await prisma.products.upsert({
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