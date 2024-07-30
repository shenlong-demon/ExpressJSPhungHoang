import { Hono } from 'hono';
import { GetGroupsFacade } from '@business/facades';

const router = new Hono();

router.get('/', async (c) => c.json(await GetGroupsFacade.getGroups()));

export default router;
