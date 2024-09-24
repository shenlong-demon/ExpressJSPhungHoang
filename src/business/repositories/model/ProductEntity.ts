import { BaseEntity } from './base_entity';

export type ProductEntity = BaseEntity & {
	code: string | null;
	name: string;
	otherName: string | null;
	image: string | null;
	price: number;
	basePrice: number;
	quantity: number;
	status: number;
};
