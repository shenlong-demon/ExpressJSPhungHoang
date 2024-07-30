import { Hono } from 'hono';
import { init as initDB } from '../prisma/PrismaClient';
import testRoute from './TestRoute';
import { Logger } from './core';
import authRoute from './routes/AuthRoute';
import productRoute from './routes/ProductRoute';
import brandRoute from './routes/BrandRoute';
import groupRoute from './routes/GroupRoute';
import operationRoute from './routes/OperationRoute';
import customerRoute from './routes/CustomerRoute';
import dataRoute from './routes/DataRoute';
import bookingRoute from './routes/BookingRoute';

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
app.route('/', testRoute);
app.route('/auth', authRoute); // Handle /book
app.route('/product', productRoute);
app.route('/brand', brandRoute);
app.route('/group', groupRoute);
app.route('/operation', operationRoute);
app.route('/customer', customerRoute);
app.route('/data', dataRoute);
app.route('/booking', bookingRoute);
export default app;
