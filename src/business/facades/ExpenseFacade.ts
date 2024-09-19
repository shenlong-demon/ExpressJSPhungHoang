import { Expense, ExpenseService } from '@business/services';
import { Dto } from '@core/common';
import { CreateExpenseRequest, ExpenseFilterRequest } from '@business/model';

export class ExpenseFacade {
	public static async createExpense(req: CreateExpenseRequest): Promise<Dto<Expense | null>> {
		return ExpenseService.createExpense(req);
	}
	public static async updateExpense(id: number, req: CreateExpenseRequest): Promise<Dto<Expense | null>> {
		return ExpenseService.updateExpense(id, req);
	}
	public static async deleteExpense(id: number): Promise<Dto<null>> {
		return ExpenseService.deleteExpense(id);
	}

	static async getExpenses(req: ExpenseFilterRequest): Promise<Dto<Expense[]>> {
		return ExpenseService.getExpenses(req);
	}
}
