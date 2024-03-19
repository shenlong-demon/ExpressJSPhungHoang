import express from "express";
import {GetBrandsFacade} from "../facades/brand";

const router = express.Router();
const authMiddleware = require('../middleware/auth_middleware');


router.get('/',authMiddleware,async (req, res): Promise<void > => {
    try {
        res.json(await GetBrandsFacade.getBrands());
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
