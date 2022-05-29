const { response } = require('express');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../../util/sequelizedb');
require('dotenv').config();

class ClientController {
    introduce_serviceAll(req, res) {
        res.render('client/service-all')
    }

    introduce_style(req, res) {
        res.render('client/discover')
    }

}


module.exports = new ClientController;