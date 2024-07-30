import { Hono } from 'hono';
import { CreateOperationFacade, GetOperationDetailFacade, GetOperationsFacade } from '@business/facades/operation';
import { Logger } from '@core/common';
import { OperationFacade } from '@business/facades';
import {
	AddOperationServiceRequest,
	AssignCustomerRequest,
	CreateOperationIssue,
	ReceiptRequest,
	SetBookingNoteRequest,
	SetOperationDiscountRequest,
} from '@business/model';
import { CancelBookingRequest } from '@business/model/request/CancelBookingRequest';

const router = new Hono();

/* GET quotes listing. */

router.post('/create', async (c) => c.json(await CreateOperationFacade.create(await c.req.json())));
router.get('/list/:offset', async (c) => c.json(await GetOperationsFacade.getOperations(Number(c.req.param('offset')))));
router.get('/detail/:id', async (c) => c.json(await GetOperationDetailFacade.getOperation(Number(c.req.param('id')))));
router.put('/assign-customer/:id', async (c) =>
	c.json(await OperationFacade.assignCustomer(Number(c.req.param('id')), (await c.req.json()) as AssignCustomerRequest)),
);
router.put('/receipt/:id', async (c) =>
	c.json(await OperationFacade.receipt(Number(c.req.param('id')), (await c.req.json()) as ReceiptRequest)),
);
router.put('/create-issue/:id', async (c) =>
	c.json(await OperationFacade.createIssue(Number(c.req.param('id')), (await c.req.json()) as CreateOperationIssue)),
);
router.put('/add-service/:id', async (c) =>
	c.json(await OperationFacade.addService(Number(c.req.param('id')), (await c.req.json()) as AddOperationServiceRequest)),
);
router.put('/cancel-booking/:id', async (c) =>
	c.json(await OperationFacade.cancelBooking(Number(c.req.param('id')), (await c.req.json()) as CancelBookingRequest)),
);
router.put('/set-booking-note/:id', async (c) =>
	c.json(await OperationFacade.setBookingNote(Number(c.req.param('id')), (await c.req.json()) as SetBookingNoteRequest)),
);
router.put('/set-operation-discount/:id', async (c) =>
	c.json(await OperationFacade.setDiscount(Number(c.req.param('id')), (await c.req.json()) as SetOperationDiscountRequest)),
);

export default router;
