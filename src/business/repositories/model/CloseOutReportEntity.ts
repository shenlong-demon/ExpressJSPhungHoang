import { BaseEntity } from '@business/repositories/model/base_entity';

export type CloseOutReportEntity = BaseEntity & {
	date: number;
	numberOfBill: number;
	totalBill: number;
	totalProfit: number;
	totalDiscount: number;
	numberOfExpense: number;
	totalExpense: number;
};
