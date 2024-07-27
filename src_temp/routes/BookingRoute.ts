import express from "express";
import {OperationFacade} from "@business/facades";
import {BookingRequest} from "@business/model";

const router = express.Router();
const authMiddleware = require('../business/middleware/auth_middleware');


router.put('/booking/:id',authMiddleware,async (req, res): Promise<void > => {
    try {
        res.json(await OperationFacade.booking(parseInt(req.params.id) , req.body as BookingRequest));
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
