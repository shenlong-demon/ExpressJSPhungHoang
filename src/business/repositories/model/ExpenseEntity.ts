import { BaseEntity } from '@business/repositories/model/base_entity';

export type ExpenseEntity = BaseEntity & {
	note: string;
	total: number;
};
