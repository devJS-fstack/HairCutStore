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
    async checkDuplicatePhone(req, res) {
        let checkDuplicate = await sequelize.query(`SELECT * FROM TaiKhoan WHERE Account = '${req.body.data.phone}'`)
        if (checkDuplicate.length > 0) {
            res.status(200).json({
                success: 'found'
            }
            )
        } else {
            res.status(200).json({
                success: 'not found'
            })
        }
    }

}

module.exports = new RegisController;