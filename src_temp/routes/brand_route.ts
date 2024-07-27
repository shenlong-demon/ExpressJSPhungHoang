import express from "express";
import {GetBrandsFacade} from "@business/facades";

const router = express.Router();
const authMiddleware = require('../business/middleware/auth_middleware');


router.get('/',authMiddleware,async (req, res): Promise<void > => {
    try {
        res.json(await GetBrandsFacade.getBrands());
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
