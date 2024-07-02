import express from "express";
import {GetProductsByStatusFacade} from "@business/facades/product/get_products_by_status_facade";


const router = express.Router();

/* GET quotes listing. */

router.get('/list', async function(req, res, next) {
    try {
        res.json(await GetProductsByStatusFacade.get(1, 0));
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post('/filter', async function(req, res, next) {
    try {
        res.json(await GetProductsByFacade.get(req.body as ProductFilterRequest));
    } catch (err) {
        res.status(500).json(err);
    }
});
router.post('/create', async function(req, res, next) {
    try {
        res.json(await CreateProductFacade.create(req.body as CreateProductRequest));
    } catch (err) {
        res.status(500).json(err);
    }
});
router.put('/update/:id', async function(req, res, next) {
    try {
        res.json(await UpdateProductFacade.update(req.params.id, req.body as UpdateProductRequest));
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
