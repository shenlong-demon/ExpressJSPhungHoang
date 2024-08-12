import { Hono } from 'hono';
import { BillsFilterRequest } from '@business/model';
import { BillFacade } from '@business/facades';

const router = new Hono();

router.post('/filter', async (c) => c.json(await BillFacade.getBillsBy((await c.req.json()) as BillsFilterRequest)));

export default router;
