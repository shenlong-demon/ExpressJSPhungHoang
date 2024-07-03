"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const { v4: uuidv4 } = require('uuid');
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const user1 = yield prisma.phuser.upsert({
            where: { phone: '0905690200 ' },
            update: {},
            create: {
                name: 'long',
                phone: '0905690200',
                password: '123456',
                appKey: uuidv4()
            },
        });
        const brand1 = yield prisma.phbrand.upsert({
            where: { id: 1 },
            update: {},
            create: {
                name: 'yamaha'
            },
        });
        const group1 = yield prisma.phgroup.upsert({
            where: { id: 1 },
            update: {},
            create: {
                name: 'manh'
            },
        });
        const product1 = yield prisma.phproduct.upsert({
            where: { id: 1 },
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
        });
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
