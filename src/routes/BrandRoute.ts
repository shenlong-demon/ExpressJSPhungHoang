import {Hono} from 'hono';
import {GetBrandsFacade} from '@business/facades';

const router = new Hono();

router.get('/', async (c) =>
	c.json(await GetBrandsFacade.getBrands()),
);

export default router;
