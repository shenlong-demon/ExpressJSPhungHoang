import { Hono } from 'hono';
import { CustomerFacade, OperationFacade } from '@business/facades';
import { BookingRequest, CreateCustomerRequest, FilterCustomerRequest, UpdateCustomerRequest } from '@business/model';

const router = new Hono();

router.put('/booking/:id', async (c) =>
	c.json(await OperationFacade.booking(Number(c.req.param('id')), (await c.req.json()) as BookingRequest)),
);

router.post('/create', async (c) => c.json(await CustomerFacade.createCustomer((await c.req.json()) as CreateCustomerRequest)));

router.put('/update/:id', async (c) =>
	c.json(await CustomerFacade.updateCustomer(Number(c.req.param('id')), (await c.req.json()) as UpdateCustomerRequest)),
);

router.post('/filter', async (c) => c.json(await CustomerFacade.searchCustomers((await c.req.json()) as FilterCustomerRequest)));

export default router;
