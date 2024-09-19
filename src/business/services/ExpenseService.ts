import { CreateExpenseRequest, ExpenseFilterRequest, UpdateExpenseRequest } from '@business/model';
import { Dto } from '@core/common';
import { Expense } from '@business/services/model';
import { ExpenseRepo } from '@business/repositories';
import { ExpenseEntity } from '@business/repositories/model';

export class ExpenseService {
	static async createExpense(req: CreateExpenseRequest): Promise<Dto<Expense | null>> {
		const entity: ExpenseEntity | null = await ExpenseRepo.createExpense(req);
		return Dto.success(entity as Expense);
	}
	static async updateExpense(id: number, req: UpdateExpenseRequest): Promise<Dto<Expense | null>> {
		const entity: ExpenseEntity | null = await ExpenseRepo.updateExpense(id, req);
		return Dto.success(entity as Expense);
	}
	static async deleteExpense(id: number): Promise<Dto<null>> {
		await ExpenseRepo.deleteExpense(id);
		return Dto.success(null);
	}

	static async getExpenses(req: ExpenseFilterRequest): Promise<Dto<Expense[]>> {
		const entities: ExpenseEntity[] = await ExpenseRepo.getExpenses(req);
		return Dto.success(entities);
	}
}
