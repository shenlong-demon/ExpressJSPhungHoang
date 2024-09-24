import { Hono } from 'hono';
import { init as initDB } from '../prisma/PrismaClient';
import testRoute from './TestRoute';
import { Logger } from './core';
import authRoute from './routes/AuthRoute';
import productRoute from './routes/ProductRoute';
import operationRoute from './routes/OperationRoute';
import customerRoute from './routes/CustomerRoute';
import dataRoute from './routes/DataRoute';
import bookingRoute from './routes/BookingRoute';
import reportRoute from './routes/ReportRoute';
import billRoute from './routes/BillRoute';
import expenseRoute from './routes/ExpenseRoute';
import { jwtAuth } from './middlewares';
import { GlobalConfig } from '@business/common';

export type Variables = {
	phone: string;
};

const app = new Hono<{ Bindings: Env; Variables: Variables }>();
let initialized: boolean = false;
app.use('*', async (c, next) => {
	if (!initialized) {
		initDB(c.env.DB);
		GlobalConfig.init(c.env);
		initialized = true;
	}
	await next();
});
app.onError(async (err, c) => {
	Logger.log(() => [`app.onError ${err}`, err]);
	const body = await c.req.json();
	Logger.logEvent(`___ SERVER ERROR ___`, { error: err, context: c.req, env: c.env, body });
	return c.json(
		{
			error: err,
		},
		500,
	);
});
app.use('/product/*', jwtAuth);
app.use('/operation/*', jwtAuth);
app.use('/customer/*', jwtAuth);
app.use('/data/*', jwtAuth);
app.use('/booking/*', jwtAuth);
app.use('/report/*', jwtAuth);
app.use('/bill/*', jwtAuth);
app.use('/expense/*', jwtAuth);

app.route('/', testRoute);
app.route('/auth', authRoute); // Handle /book
app.route('/product', productRoute);
app.route('/operation', operationRoute);
app.route('/customer', customerRoute);
app.route('/data', dataRoute);
app.route('/booking', bookingRoute);
app.route('/report', reportRoute);
app.route('/bill', billRoute);
app.route('/expense', expenseRoute);
export default app;
