import {
	CreateExpenseRequest,
	DoCloseOutReportRequest,
	ExpenseFilterRequest,
	GetCloseOutReportsRequest,
	UpdateExpenseRequest,
	UpdateGroupRequest,
} from '../business';
import { Hono } from 'hono';
import { ReportFacade } from '@business/facades/ReportFacade';
import { ExpenseFacade } from '@business/facades/ExpenseFacade';
import { DataFacade } from '@business/facades/DataFacade';
import { GetOperationsFacade } from '@business/facades/operation';

const router = new Hono();

/* GET quotes listing. */
router.post('/create', async (c) => c.json(await ExpenseFacade.createExpense((await c.req.json()) as CreateExpenseRequest)));
router.put('/update/:id', async (c) =>
	c.json(await ExpenseFacade.updateExpense(Number(c.req.param('id')), (await c.req.json()) as UpdateExpenseRequest)),
);
router.delete('/delete/:id', async (c) => c.json(await ExpenseFacade.deleteExpense(Number(c.req.param('id')))));
router.post('/filter', async (c) => c.json(await ExpenseFacade.getExpenses((await c.req.json()) as ExpenseFilterRequest)));

export default router;
