
export type CreateProductRequest =  {
    name: string;
    code?: string;
    otherName?: string;
    image?: string;
    price: number;
    quantity: number;
    brandId: number;
    groupId: number;
    appKey: string;
};
