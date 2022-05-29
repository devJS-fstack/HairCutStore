const TaiKhoan = require('../Models/TaiKhoan');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../util/sequelizedb');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');


require('dotenv').config();
class HomeController {
    // Handle main home
    async getMain(req, res, next) {
        var scripts = [{ script: '/js-handle/home.js' }]
        res.render('home', {
            scripts: scripts
        });
    }

    async postLogin(req, res) {
        const account = req.body.data.account;
        const password = req.body.data.password;
        const salt = await bcrypt.genSalt(10);
        let user = await sequelize.query(`SELECT * FROM TaiKhoan,Customer WHERE Account = PhoneCustomer and Account = '${account}'`)
        if (user[0].length > 0) {
            const result = await bcrypt.compare(password, user[0][0].Password);
            if (result == true) {
                const encodedToken = () => {
                    return JWT.sign({
                        role: user[0][0].IDRole,
                        accountId: user[0][0].Account,
                        nameCustomer: user[0][0].NameCustomer,
                        iat: new Date().getTime(),
                        exp: new Date().setDate(new Date().getDate() + 3)
                    }, process.env.SECRET_KEY_ACCESS_TOKEN);
                }
                const token = encodedToken();
                res.status(200).json({
                    status: "success",
                    elements: {
                        token: token,
                        nameUser: user[0][0].NameCustomer,
                        phoneCustomer: user[0][0].PhoneCustomer
                    }
                })
            } else {
                res.status(200).json({
                    status: "fail",
                    elements: {
                        err: "User is not found",
                    }
                })
            }
        }
        // if (user.length > 0) {
        //     const encodedToken = () => {
        //         return JWT.sign({
        //             role: user[0].IDRole,
        //             accountId: user[0].Account,
        //             nameCustomer: user[0].NameCustomer,
        //             iat: new Date().getTime(),
        //             exp: new Date().setDate(new Date().getDate() + 3)
        //         }, process.env.SECRET_KEY_ACCESS_TOKEN);
        //     }
        //     const token = encodedToken();
        //     res.status(200).json({
        //         status: "success",
        //         elements: {
        //             token: token,
        //             nameUser: user[0].NameCustomer,
        //             phoneCustomer: user[0].PhoneCustomer
        //         }
        //     })
        // }
        // else {
        //     res.status(200).json({
        //         status: "fail",
        //         elements: {
        //             err: "User is not found",
        //         }
        //     })
        // }
    }

    checkToken(req, res) {
        JWT.verify(req.body.data.accessToken, process.env.SECRET_KEY_ACCESS_TOKEN, (err, user) => {
            if (err) {
                return res.status(200).json({
                    status: 'Does not token real',
                })
            }
            else {
                return res.status(200).json({
                    status: 'success',
                    nameCustomer: user.nameCustomer,
                    phoneCustomer: user.accountId
                })
            }
        })
    }

    passportAuthen(req, res) {
        try {
            res.json({
                body: req.body
            })
        } catch (error) {
            res.json({
                error: error.stack
            })
        }
    }

    status(req, res) {
        res.status(200).json({
            status: 'success',
            message: 'ok'
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

    async getServices(req, res) {
        let services = await sequelize.query(`select * from Service`);
        return res.status(200).json({
            status: 'success',
            services: services[0],
        })
    }


}

module.exports = new HomeController;