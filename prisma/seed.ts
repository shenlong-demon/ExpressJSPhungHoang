import { PrismaClient } from '@prisma/client'
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient()
async function main() {

    const userData = [{id: 1, name: "long", phone: "0905690200", password: "123456"}];
    for (let data of userData) {
        const user = await prisma.phuser.upsert({
            where: { id: data.id},
            update: {},
            create: {
                name: data.name,
                phone: data.phone,
                password: data.password,
            },
        })
    }


    const brandData = [{id: 1, name: "yamaha"},{id: 2, name: "honda"},{id: 3, name: "suzuki"},{id: 4, name: "khác"}];
    for (let data of brandData) {
        const brand = await prisma.phbrand.upsert({
            where: { id: data.id},
            update: {},
            create: {
                name: data.name
            },
        })
    }

    const groupData = [{id: 1, name: "manh"},{id: 2, name: "buri"},{id: 3, name: "lốp xe"},{id: 4, name: "vành xe"},{id: 5, name: "khác"}];
    for (let data of groupData) {
        const group = await prisma.phgroup.upsert({
            where: { id: data.id},
            update: {},
            create: {
                name: data.name
            },
        })
    }

    const productData = [
        {
            id: 1,
            code: 'ma_ya_1',
            name: 'manh yamaha',
            otherName: '',
            image: '',
            price: 10.0,
            basePrice: 5.0,
            quantity: 10,
            brandId: 1,
            groupId: 1
        },{
            id: 2,
            code: 'ma_ho_1',
            name: 'manh honda',
            otherName: '',
            image: '',
            price: 10.0,
            basePrice: 5.0,
            quantity: 10,
            brandId: 2,
            groupId: 1
        },{
            id: 3,
            code: 'ma_su_1',
            name: 'manh suzuki',
            otherName: '',
            image: '',
            price: 10.0,
            basePrice: 5.0,
            quantity: 10,
            brandId: 3,
            groupId: 1
        },
    ];

    for (let data of productData) {
        const product = await prisma.phproduct.upsert({
            where: { id: data.id},
            update: {},
            create: {
                name: data.name,
                code: data.code,
                otherName: '',
                image: '',
                price: data.price,
                basePrice: data.basePrice,
                quantity: data.quantity,
                brandId: data.brandId,
                groupId: data.groupId,
            },
        })
    }
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
