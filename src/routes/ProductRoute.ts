import { Hono } from 'hono';
import { CreateProductFacade, GetProductsByFacade, UpdateProductFacade } from '@business/facades';
import { CreateProductRequest, ProductFilterRequest, UpdateProductRequest } from '@business/model';

const router = new Hono();

/* GET quotes listing. */

// router.get('/list', async (c) => {
// 	try {
// 		c.json(await GetProductsByStatusFacade.get(Number(c.req.param('id')), (await c.req.json()) as AssignCustomerRequest)),
// 			res.json(await GetProductsByStatusFacade.get(1, 0));
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

router.post('/filter', async (c) => c.json(await GetProductsByFacade.get((await c.req.json()) as ProductFilterRequest)));
router.post('/create', async (c) => c.json(await CreateProductFacade.create((await c.req.json()) as CreateProductRequest)));
router.put('/update/:id', async (c) =>
	c.json(await UpdateProductFacade.update(Number(c.req.param('id')), (await c.req.json()) as UpdateProductRequest)),
);

export default router;
