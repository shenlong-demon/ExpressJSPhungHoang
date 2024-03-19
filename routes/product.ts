import express from "express";
import {GetProductsByStatusFacade} from "../facades/product/get_products_by_status_facade";

const router = express.Router();

/* GET quotes listing. */

router.get('/list', async function(req, res, next) {
    try {
        res.json(await GetProductsByStatusFacade.get(1, 0));
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;