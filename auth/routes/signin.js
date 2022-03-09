'use strict'
const express = require('express');
const {users} = require('../models/index');
const router = express.Router();
const basicAuth = require('../middleware/basicAuth.js');



router.post('/signin',basicAuth,signinFunc);

async function signinFunc(req,res) {
    res.status(200).json(req.user);
}
module.exports = router;