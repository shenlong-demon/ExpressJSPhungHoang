import express from "express";
import {CustomerFacade} from "@business/facades";
import {CreateCustomerRequest, UpdateCustomerRequest} from "@business//model";


const router = express.Router();

/* GET quotes listing. */

router.post('/create', async function(req, res, next) {
    try {
        res.json(await CustomerFacade.createCustomer(req.body as CreateCustomerRequest));
    } catch (err) {
        res.status(500).json(err);
    }
});
router.put('/update/:id', async function(req, res, next) {
    try {
        res.json(await CustomerFacade.updateCustomer(Number(req.params.id) , req.body as UpdateCustomerRequest));
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
