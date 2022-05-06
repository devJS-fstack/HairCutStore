const { response } = require('express');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../../util/sequelizedb');
const nodemailer = require("nodemailer");
require('dotenv').config();

class StaffController {
    main(req, res) {
        res.render('staff/login')
    }
}


module.exports = new StaffController;