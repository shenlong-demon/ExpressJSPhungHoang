export type ProductFilterRequestDto = {
    name: string | null;
    brandId: number | null;
    groupId: number | null;
    status: number | null;
    offset: number;
}
