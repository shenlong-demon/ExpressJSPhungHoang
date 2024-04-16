import express from "express";
import {GetGroupsFacade} from "../facades/group";

const router = express.Router();

/* GET quotes listing. */

router.get('/', async function(req, res, next) {
    try {
        res.json(await GetGroupsFacade.getGroups());
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
