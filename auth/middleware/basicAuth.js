'use strict';
require('dotenv').config();
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const jwt = require('jsonwebtoken');
const {users} = require('../models/index');
const SECRET = process.env.SECRET;

    const basicAuth = async (req, res, next) => {
        if(req.headers['authorization']) {
            let basicHeaderParts= req.headers.authorization.split(' ');
            console.log('basicHeaderParts >>> ',basicHeaderParts);
            let encodedPart = basicHeaderParts.pop(); //encoded(username:password)
            console.log('encodedPart >>> ',encodedPart);
            let decoded = base64.decode(encodedPart); //username:password
            console.log('decoded >>> ',decoded);
            let [username,password]= decoded.split(':'); //[username: password]
            // console.log('username');
            
                const user = await users.findOne({where:{username:username}});
                const valid = await bcrypt.compare(password,user.password);
                if(valid) {
                    let newToken = jwt.sign({username:user.username},SECRET);
                    user.token = newToken;
                    req.user = user;
                    next();
                } else {
                    next(`input is invalid`);
                }
    }
}

module.exports = basicAuth;