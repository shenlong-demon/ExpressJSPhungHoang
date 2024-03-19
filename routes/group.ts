import express from "express";
import {LoginWithPhoneNumberAndPasswordFacade} from "../facades";
import {UpdateGroupFacade} from "../facades/group/update_group_facade";
const router = express.Router();

/* GET quotes listing. */

router.get('/', async function(req, res, next) {
    try {
        res.json(await UpdateGroupFacade.update(-1, "Đèn Pha 2", 1));
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;