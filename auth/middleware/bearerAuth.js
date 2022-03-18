'use strict';
require('dotenv').config();
const SECRET = process.env.SECRET;
const jwt = require('jsonwebtoken');
const {users} = require('../models/index');

const bearerAuth = async (req, res, next) => {

if (req.headers.authorization) {
    try {
        let bearerHeadersParts = req.headers.authorization.split(' ');
        let token = bearerHeadersParts.pop();

        if (token) {
            const userToken = jwt.verify(token, SECRET);

            const user = await users.findOne({ where: { username: userToken.username } });
            console.log(userToken);
            if (user) {
                req.token = userToken;
                req.user = user;
                next();
            } else {
                res.status(403).send('invalid user')
            }
        }
    } catch (error) {
        res.status(403).send('invalid Token');
    }
} else {
    res.status(403).send('Empty Token')
}
}
module.exports = bearerAuth;
