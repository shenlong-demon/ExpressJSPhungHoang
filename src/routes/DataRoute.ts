import { Hono } from 'hono';
import { DataFacade } from '@business/facades/DataFacade';

const router = new Hono();

router.get('/all', async (c) => c.json(await DataFacade.getAll()));

export default router;
