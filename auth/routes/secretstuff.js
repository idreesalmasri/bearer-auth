const express = require('express');
const router = express.Router();
const bearerAuth = require('../middleware/bearerAuth.js');



router.get('/secretstuff',bearerAuth,secretstuffFunc);

async function secretstuffFunc(req,res) {
    res.status(200).json(req.user);
}
module.exports = router;