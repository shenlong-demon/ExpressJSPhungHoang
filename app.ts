import express,{Express} from "express";
const authRoute = require('./routes/auth_route');
const testRoute = require('./routes/test');
const productRoute = require('./routes/product_route');
const brandRoute = require('./routes/brand_route');
const groupRoute = require('./routes/group_route');
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
app.use('/test', testRoute);
app.use('/product', productRoute);
app.use('/brand', brandRoute);
app.use('/group', groupRoute);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
