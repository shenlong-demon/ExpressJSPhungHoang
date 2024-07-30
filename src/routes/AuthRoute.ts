import { LoginWithPhoneNumberAndPasswordFacade, LoginRequest } from '../business';
import { Hono } from 'hono';
const router = new Hono();

/* GET quotes listing. */
router.post('/login', async (c) => c.json(await LoginWithPhoneNumberAndPasswordFacade.login(c.req.param() as LoginRequest)));

export default router;
