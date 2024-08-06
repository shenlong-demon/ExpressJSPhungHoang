import { Hono } from 'hono';
import { GetGroupsFacade } from '@business/facades';
import { DataFacade } from '@business/facades/DataFacade';
import { CreateBrandRequest, CreateGroupRequest, UpdateBrandRequest, UpdateGroupRequest } from '@business/model';

const router = new Hono();

router.get('/', async (c) => c.json(await GetGroupsFacade.getGroups()));

router.post('/create', async (c) => c.json(await DataFacade.createGroup((await c.req.json()) as CreateGroupRequest)));
router.put('/update/:id', async (c) =>
	c.json(await DataFacade.updateGroup(Number(c.req.param('id')), (await c.req.json()) as UpdateGroupRequest)),
);
export default router;
