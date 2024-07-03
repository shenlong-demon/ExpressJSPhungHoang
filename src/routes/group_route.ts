import express from "express";
import {GetGroupsFacade} from "../business/facades";
const authMiddleware = require('../business/middleware/auth_middleware');

const router = express.Router();

/* GET quotes listing. */

router.get('/',authMiddleware, async function(req, res, next) {
    try {
        res.json(await GetGroupsFacade.getGroups());
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
