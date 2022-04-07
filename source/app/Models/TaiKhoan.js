const Sequelize = require('sequelize');
const { sequelize } = require('../../util/sequelizedb');


const TaiKhoan = sequelize.define('TaiKhoan', {
    Account: {
        type: Sequelize.STRING,
        allowNull: false,
        primary: true
    },
    Password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    timestamps: false,
})

module.exports = TaiKhoan;