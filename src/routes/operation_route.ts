import express from "express";
import {CreateOperationFacade, GetOperationDetailFacade, GetOperationsFacade} from "@business/facades/operation";
import {Logger} from "@core/common";

const authMiddleware = require('../business/middleware/auth_middleware');

const router = express.Router();

/* GET quotes listing. */

router.post('/create',authMiddleware, async function(req, res, next) {
    try {
        res.json(await CreateOperationFacade.create(req.body.name));
    } catch (err) {
        Logger.log(() => [`operation create `, req.body, err]);
        res.status(500).json(err);
    }
});
router.get('/list/:offset',authMiddleware, async function(req, res, next) {
    try {
        res.json(await GetOperationsFacade.getOperations(Number(req.params.offset)));
    } catch (err) {
        Logger.log(() => [`operation create `, req.body, err]);
        res.status(500).json(err);
    }
});
router.get('/detail/:id',authMiddleware, async function(req, res, next) {
    try {
        res.json(await GetOperationDetailFacade.getOperation(Number(req.params.id)));
    } catch (err) {
        Logger.log(() => [`operation create `, req.body, err]);
        res.status(500).json(err);
    }
});


module.exports = router;
