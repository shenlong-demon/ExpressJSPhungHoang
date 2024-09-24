export type CreateProductRequest = {
	name: string;
	code?: string;
	otherName?: string;
	image?: string;
	price: number;
	basePrice: number;
	quantity: number;
	appKey: string;

	status: number;
};
