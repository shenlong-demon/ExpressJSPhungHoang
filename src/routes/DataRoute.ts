import express from "express";
import {DataFacade} from "@business/facades/DataFacade";


const router = express.Router();

/* GET quotes listing. */

router.get('/all', async function(req, res, next) {
    try {
        res.json(await DataFacade.getAll());
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
