import express from "express";
import {GetBrandsFacade} from "../facades/brand";
const router = express.Router();


router.get('/', async function(req, res, next) {
    try {
        res.json(await GetBrandsFacade.getBrands());
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
