export type ExpenseFilterRequest = {
	text: string | null;
	date: number | null | undefined;
	offset: number;
};
