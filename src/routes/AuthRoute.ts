import { LoginRequest, LoginWithPhoneNumberAndPasswordFacade } from '../business';
import { Hono } from 'hono';

const router = new Hono();

/* GET quotes listing. */
router.post('/login', async (c) => c.json(await LoginWithPhoneNumberAndPasswordFacade.login((await c.req.json()) as LoginRequest)));

export default router;
