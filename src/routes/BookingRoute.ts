import { Hono } from 'hono';
import { OperationFacade } from '@business/facades';
import { BookingRequest } from '@business/model';

const router = new Hono();

router.put('/booking/:id', async (c) =>
	c.json(await OperationFacade.booking(Number(c.req.param('id')), (await c.req.json()) as BookingRequest)),
);

export default router;
