import express from "express";
import {LoginWithPhoneNumberAndPasswordFacade} from "../facades";
const router = express.Router();

/* GET quotes listing. */
router.post('/login', async function(req, res, next) {
    try {
        res.json(await LoginWithPhoneNumberAndPasswordFacade.login(req.body.phone, req.body.password));
    } catch (err) {
        res.status(500).json({'message': ""});
    }
});
router.get('/', async function(req, res, next) {
    try {
        res.json(await LoginWithPhoneNumberAndPasswordFacade.login("0905690200", "123456"));
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
