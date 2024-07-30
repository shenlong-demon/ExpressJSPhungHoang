import { Hono } from 'hono';
import { TestFacade } from '@business/facades/TestFacade';
const router = new Hono();

/* GET quotes listing. */
router.get('/', async (c) => c.json(await TestFacade.get()));

export default router;
