import express from "express";
import {LoginRequest} from "../business/model/request";
import {LoginWithPhoneNumberAndPasswordFacade} from "../business/facades";
const router = express.Router();

/* GET quotes listing. */
router.post('/login', async function(req, res, next) {
    try {
        res.json(await LoginWithPhoneNumberAndPasswordFacade.login(req.body as LoginRequest));
    } catch (err) {
        res.status(500).json({'message': ""});
    }
});


module.exports = router;
