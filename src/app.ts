import { Hono } from 'hono';
import { init as initDB } from '../prisma/PrismaClient';
import TestRoute from './TestRoute';
import { Logger } from './core';
import AuthRoute from './routes/AuthRoute';

const app = new Hono<{ Bindings: Env }>();
let initialized: boolean = false;
app.use('*', async (c, next) => {
	if (!initialized) {
		initDB(c.env.DB);
		initialized = true;
	}
	await next();
});
app.onError((err, c) => {
	Logger.log(() => [`${err}`]);
	return c.json(
		{
			error: err,
		},
		500,
	);
});
app.route('/', TestRoute);
app.route('/auth', AuthRoute); // Handle /book

export default app;
