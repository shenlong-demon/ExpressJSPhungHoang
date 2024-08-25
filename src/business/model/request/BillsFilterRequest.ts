export type BillsFilterRequest = {
	text: string | null;
	date: number | null | undefined;
	offset: number;
};
