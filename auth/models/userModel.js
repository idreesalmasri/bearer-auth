'use strict'

const users = (sequelize, DataTypes) => sequelize.define('usersTable', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
        // unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type:DataTypes.VIRTUAL
    }
})


module.exports = users;