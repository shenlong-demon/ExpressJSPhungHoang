import express from "express";
import {
    CreateProductFacade,
    GetProductsByFacade,
    GetProductsByStatusFacade,
    UpdateProductFacade
} from "../business/facades";
import {UpdateProductRequest, CreateProductRequest, ProductFilterRequest} from "../business/model";


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
        res.json(await UpdateProductFacade.update(parseInt(req.params.id) , req.body as UpdateProductRequest));
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
