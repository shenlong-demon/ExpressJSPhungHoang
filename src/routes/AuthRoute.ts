import { AuthFacade, LoginRequest, LoginWithPhoneNumberAndPasswordFacade } from '../business';
import { Context, Hono } from 'hono';
import { jwtAuth } from '../middlewares';

const router = new Hono();

/* GET quotes listing. */
router.post('/login', async (c) => c.json(await LoginWithPhoneNumberAndPasswordFacade.login((await c.req.json()) as LoginRequest)));
router.post('/logout', jwtAuth, async (c: Context) => c.json(await AuthFacade.logout(c.get('phone'))));

export default router;
