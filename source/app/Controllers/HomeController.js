const TaiKhoan = require('../Models/TaiKhoan');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../util/sequelizedb');
class HomeController {
    // GET/ news
    async main(req, res, next) {
        req.app.locals._service.serviceIds = [];

        let data = await sequelize.query("SELECT * FROM TaiKhoan", {
            raw: true,
            type: QueryTypes.SELECT,
        });
        // data[0] = data[0].map(user => user.toObject());
        // console.log(data)
        res.render('home');
        let user = req.app.locals._user;
        user.nameUser = '';
    };


    async login(req, res, next) {
        // query ignore --AND Password='${req.body.inputPassword}' COLLATE SQL_Latin1_General_CP1_CS_AS --
        let user = await sequelize.query(`SELECT * FROM TaiKhoan,Customer WHERE Account = Phone AND Account='${req.body.inputAccount}' COLLATE SQL_Latin1_General_CP1_CS_AS
        AND Password='${req.body.inputPassword}' COLLATE SQL_Latin1_General_CP1_CS_AS`, {
            raw: true,
            type: QueryTypes.SELECT,
        })
            .then((result) => {
                if (result.length > 0) {
                    res.locals._nameUser.isLogin = true;
                    res.locals._nameUser.nameUser = result[0].Name;
                    res.render('home', {
                        name: result[0].Name,
                        phone: result[0].Phone,
                    });
                } else {
                    res.locals._nameUser.isLogin = false;
                    res.send(`Login Fail`);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    async regis(req, res, next) {
        var name = req.body.inputName;
        var phone = req.body.inputPhone;
        var email = req.body.inputEmail;
        var pass = req.body.inputPassword;
        var checkDuplicate = false;
        // check duplicate account
        let checkPhone = await sequelize.query(`
        SELECT * FROM TaiKhoan WHERE Account = '${phone}'
        `, {
            raw: true,
            type: QueryTypes.SELECT
        }).then((result) => {
            if (result.length > 0) {
                checkDuplicate = true;
                res.send("Số điện thoại này đã được đăng ký tài khoản. Quý khách vui lòng thử lại sau! ");
            }
        })
            .catch(() => console.log("Có lỗi khi check tài khoản"));
        if (!checkDuplicate) {
            //insert account
            let insertAcc = await sequelize.query(`
        INSERT INTO TaiKhoan(Account,Password,Status,IDRole) VALUES ('${phone}','${pass}','Active','1')`, {
                raw: true,
                type: QueryTypes.INSERT
            }).catch(() => res.send("Có lỗi khi tạo tài khoản"));
            var lengthCus = 0;
            let cus = await sequelize.query(`
        SELECT * FROM Customer
        `, {
                raw: true,
                type: QueryTypes.SELECT,
            }).then((result) => {
                lengthCus = result.length + 1;
            }).catch((err) => console.log(err));
            // insert Customer
            let insertCus = await sequelize.query(`
            INSERT INTO Customer(IDCustomer,Name,Phone,Email) VALUES('${lengthCus}',N'${name}','${phone}','${email}')
            `, {
                raw: true,
                type: QueryTypes.INSERT,
            }).then(() => res.send("Tạo tài khoản thành công"))
                .catch(() => res.send("Có lỗi khi lưu thông tin khách hàng"));
        }

    }
}

module.exports = new HomeController;