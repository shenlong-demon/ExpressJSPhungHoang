import { Hono } from 'hono';
import { GetBrandsFacade, UpdateProductFacade } from '@business/facades';
import { DataFacade } from '@business/facades/DataFacade';
import { CreateBrandRequest, UpdateBrandRequest, UpdateCustomerRequest, UpdateProductRequest } from '@business/model';

const router = new Hono();

router.get('/', async (c) => c.json(await GetBrandsFacade.getBrands()));
router.post('/create', async (c) => c.json(await DataFacade.createBrand((await c.req.json()) as CreateBrandRequest)));
router.put('/update/:id', async (c) =>
	c.json(await DataFacade.updateBrand(Number(c.req.param('id')), (await c.req.json()) as UpdateBrandRequest)),
);
export default router;
