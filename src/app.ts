import express,{Express} from "express";
import {Logger} from "@core/common";
const morgan = require('morgan');

const authRoute = require('./routes/auth_route');
const productRoute = require('./routes/product_route');
const brandRoute = require('./routes/brand_route');
const groupRoute = require('./routes/group_route');
const operationRoute = require('./routes/operation_route');
const customerRoute = require('./routes/CustomerRoute');
const dataRoute = require('./routes/DataRoute');
const bookingRoute = require('./routes/BookingRoute');
const app:Express = express()
const port = 3000


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    console.log('Request param', req.originalUrl, req.body, req.params);
    next();
});
app.get('/', (req, res) => {
    res.send('Hello World ExpressJS! dhjsdhjsjdhsjdh')
})

app.use('/auth', authRoute);
app.use('/product', productRoute);
app.use('/brand', brandRoute);
app.use('/group', groupRoute);
app.use('/operation', operationRoute);
app.use('/customer', customerRoute);
app.use('/data', dataRoute);
app.use('/booking', bookingRoute);
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use((req, res, next) => {
    const start = Date.now();

    // Log request details
    console.log(`Incoming request: ${req.method} ${req.url}`);

    // Capture the original send function
    const originalSend = res.send;

    // Override the send function to log response details
    res.send = function (body) {
        const duration = Date.now() - start;
        Logger.log(() => [`Outgoing response: ${res.statusCode} - ${body} - ${duration}ms`]);

        // Call the original send function with the response body
        return originalSend.call(this, body);
    };

    next();
});
// Error-handling middleware
app.use((err: any, req: any, res: any, next: any) => {
    // Log the error
    Logger.log(() => [`Error occurred: ${err.message}`, err]);

    // Set response status code
    res.status(err.status || 500);

    // Send error response
    res.json({
        error: {
            message: err.message,
            status: err.status || 500
        }
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
