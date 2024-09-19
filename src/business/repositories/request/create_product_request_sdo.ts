export type CreateProductRequestSdo = {
	name: string;
	code?: string;
	otherName?: string;
	image?: string;
	price: number;
	basePrice: number;
	quantity: number;

	status: number;
};
