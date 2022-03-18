'use strict';
require('dotenv').config();
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const JWT = require('jsonwebtoken');
const {users} = require('../models/index');
const SECRET = process.env.SECRET;

    const basicAuth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            let basicHeeaderParts = req.headers.authorization.split(' ');
            let encoded = basicHeeaderParts.pop();
            let decoded = base64.decode(encoded);
            let [username, password] = decoded.split(':');

            const user = await users.findOne({ where: { username: username } });
            const valid = await bcrypt.compare(password, user.password);
            if (valid) {
                req.user = user
                let newToken = JWT.sign({username:user.username},SECRET,{expiresIn : 900000});//newToken 900000s ==15min
                user.token=newToken;
                res.status(200).json(user);
            } else {
                res.status(403).send('invalid login Password')
            }
        }} catch(error) {
            res.status(403).send('invalid login Username')
        }
}

module.exports = basicAuth;