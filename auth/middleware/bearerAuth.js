'use strict';
require('dotenv').config();
const SECRET = process.env.SECRET;
const jwt = require('jsonwebtoken');
const {users} = require('../models/index');

const bearerAuth = async (req, res, next) => {
    if(req.headers['authorization']) {
        let bearerHeaderParts= req.headers.authorization.split(' ');
        console.log('bearerHeaderParts >>> ',bearerHeaderParts);
        let token = bearerHeaderParts.pop(); //encoded(username:password)
        console.log('token >>> ',token);
       
        
        const parsedToken = jwt.verify(token,SECRET);
        console.log('llllllll',parsedToken);
        
        const user = await users.findOne({where:{username:parsedToken.username}});
            if(user) {
                req.user = user;
                next();
            } else {
                next(`invalid token`);
            }
}
}
module.exports = bearerAuth;
