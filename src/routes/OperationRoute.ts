import express from "express";
import {CreateOperationFacade, GetOperationDetailFacade, GetOperationsFacade} from "@business/facades/operation";
import {Logger} from "@core/common";
import {OperationFacade} from "@business/facades";
import {AssignCustomerRequest, CreateOperationIssue, ProductFilterRequest, ReceiptRequest} from "@business/model";

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
router.put('/assign-customer/:id',authMiddleware, async function(req, res, next) {
    try {
        res.json(await OperationFacade.assignCustomer(Number(req.params.id), req.body as AssignCustomerRequest));
    } catch (err) {
        res.status(500).json(err);
    }
});
router.put('/receipt/:id',authMiddleware, async function(req, res, next) {
    try {
        res.json(await OperationFacade.receipt(Number(req.params.id), req.body as ReceiptRequest));
    } catch (err) {
        res.status(500).json(err);
    }
});
router.put('/create-issue/:id',authMiddleware, async function(req, res, next) {
    try {
        res.json(await OperationFacade.createIssue(Number(req.params.id), req.body as CreateOperationIssue));
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
