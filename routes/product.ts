import express from "express";
import {GetProductsByStatusFacade} from "../facades/product/get_products_by_status_facade";
import {GetProductsByFacade} from "../facades";
import {ProductFilterRequest} from "../facades/requests";

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


module.exports = router;
