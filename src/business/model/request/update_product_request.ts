export type UpdateProductRequest = {
	name: string;
	code?: string;
	otherName?: string;
	image?: string;
	price: number;
	basePrice: number;
	brandId: number;
	groupId: number;
	quantity: number;
	status: number;
};
