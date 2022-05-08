const { response } = require('express');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../../util/sequelizedb');
require('dotenv').config();

class StaffController {
    main(req, res) {
        res.render('staff/login')
    }
    async login(req, res) {
        let login = await sequelize.query(`SELECT * FROM TaiKhoan WHERE Account='${req.body.username}' and Password='${req.body.password}' AND IDRole = 3`, {
            raw: true,
            type: QueryTypes.SELECT,
        })
        if (login.length > 0) {
            res.status(200).json({
                status: 'found',
            })
        }
        else {
            res.status(200).json({
                status: 'not found'
            })
        }
    }

    dashboard(req, res) {
        res.render('staff/main')
    }
    service(req, res) {
        res.render('staff/service')
    }
}


module.exports = new StaffController;