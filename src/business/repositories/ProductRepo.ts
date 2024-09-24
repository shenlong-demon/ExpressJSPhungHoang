import { ProductEntity } from './model';
import { CreateProductRequest, ProductFilterRequest, UpdateProductRequest } from '@business/model/request';
import { DB_CONSTANT, Logger } from '@core/common';

import { prisma } from '../../../prisma/PrismaClient';
import { DateTimeUtils } from '@business/common';

export class ProductRepo {
	static async createNewProduct(req: CreateProductRequest): Promise<ProductEntity | null> {
		const product: any | null = await prisma.phproduct.create({
			data: {
				name: req.name,
				otherName: req.otherName,
				code: req.code,
				basePrice: req.basePrice,
				price: req.price,
				quantity: req.quantity,
				image: req.image,
				status: req.status,
				createdAt: DateTimeUtils.now(),
				updatedAt: DateTimeUtils.now(),
			},
		});
		return product;
	}
	static async updateProduct(id: number, req: UpdateProductRequest): Promise<ProductEntity | null> {
		const product: any | null = await prisma.phproduct.update({
			where: {
				id,
			},
			data: {
				code: req.code,
				name: req.name,
				otherName: req.otherName,
				price: req.price,
				basePrice: req.basePrice,
				quantity: req.quantity,
				image: req.image,
				status: req.status,
				updatedAt: DateTimeUtils.now(),
			},
		});
		return product;
	}

	static async getProducts(status: number, offset: number): Promise<ProductEntity[]> {
		Logger.log(() => [`ProductRepo getProducts ${status} ${offset}`]);
		const products: any[] = await prisma.phproduct.findMany({
			where: {
				status,
			},
			skip: offset * DB_CONSTANT.PAGING,
			take: DB_CONSTANT.PAGING,
		});
		return products;
	}
	static async getProductsBy(req: ProductFilterRequest): Promise<ProductEntity[]> {
		Logger.log(() => [`ProductRepo getProductsBy `, req]);
		const products: any[] = await prisma.phproduct.findMany({
			where: {
				status: req.status !== null ? req.status : undefined,
			},
			skip: req.offset * DB_CONSTANT.PAGING,
			take: DB_CONSTANT.PAGING,
		});
		Logger.log(() => [`ProductRepo getProductsBy  RESULT `, req, products]);

		return products as ProductEntity[];
	}

	static async getProductById(productId: number): Promise<ProductEntity | null> {
		Logger.log(() => [`ProductRepo getProductById ${productId}`]);
		const product: ProductEntity | null = await prisma.phproduct.findFirst({
			where: {
				id: productId,
			},
		});
		Logger.log(() => [`ProductRepo getProductById  ${productId} RESULT `, product]);

		return product;
	}
}
