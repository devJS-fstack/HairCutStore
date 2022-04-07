const { response } = require('express');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../util/sequelizedb');

class RegisController {
    main(req, res, next) {
        res.render('regis');
    }
    async createUser(req, res, next) {
        let sql = await sequelize.query(`INSERT INTO TaiKhoan(Account,Password,Status,IDRole) 
        VALUES('${req.body.accountRegis}','${req.body.passwordRegis}','Active',1)`, {
            raw: true,
            type: QueryTypes.INSERT,
        })
            .then(result => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new RegisController;