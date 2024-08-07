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
import reportRoute from './routes/ReportRoute';
import { jwtAuth } from './middlewares';
import { GlobalConfig } from '@business/common';

const app = new Hono<{ Bindings: Env }>();
let initialized: boolean = false;
app.use('*', async (c, next) => {
	if (!initialized) {
		initDB(c.env.DB);
		GlobalConfig.init(c.env);
		initialized = true;
	}
	await next();
});
app.onError((err, c) => {
	Logger.log(() => [`app.onError ${err}`, err]);
	return c.json(
		{
			error: err,
		},
		500,
	);
});
app.use('/product/*', jwtAuth);
app.use('/brand/*', jwtAuth);
app.use('/group/*', jwtAuth);
app.use('/operation/*', jwtAuth);
app.use('/customer/*', jwtAuth);
app.use('/data/*', jwtAuth);
app.use('/booking/*', jwtAuth);
app.use('/report/*', jwtAuth);

app.route('/', testRoute);
app.route('/auth', authRoute); // Handle /book
app.route('/product', productRoute);
app.route('/brand', brandRoute);
app.route('/group', groupRoute);
app.route('/operation', operationRoute);
app.route('/customer', customerRoute);
app.route('/data', dataRoute);
app.route('/booking', bookingRoute);
app.route('/report', reportRoute);
export default app;
