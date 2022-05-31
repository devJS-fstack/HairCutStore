const { response } = require('express');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../util/sequelizedb');
const nodemailer = require("nodemailer");
require('dotenv').config();
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');



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
        let checkDuplicate = await sequelize.query(`SELECT * FROM TaiKhoan WHERE Account = '${req.body.data.phone}'`, {
            raw: true,
            type: QueryTypes.SELECT
        })
        if (checkDuplicate.length > 0) {
            res.status(200).json({
                status: 'found',
            })
        } else {
            res.status(200).json({
                status: 'not found',
            })
        }
    }

    async checkDuplicateEmail(req, res) {
        var sql = `SELECT * FROM Customer WHERE EmailCustomer = '${req.body.data.email}'`
        let checkDuplicate = await sequelize.query(sql);
        if (checkDuplicate[0].length > 0) {
            res.status(200).json({
                status: 'found',
            })
        } else {
            res.status(200).json({
                status: 'not found',
            })
        }
    }


    async verifyEmail(req, res) {
        let userLocal = req.app.locals._userRegis;
        userLocal.verifyNumber = 0;
        userLocal.name = req.body.inputName;
        userLocal.phone = req.body.inputPhone;
        userLocal.email = req.body.inputEmail;
        userLocal.password = req.body.inputPasswordNew;


        let transporter = nodemailer.createTransport({
            type: 'SMTP',
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_ACCOUNT_AUTHOR,
                pass: process.env.EMAIL_PASSWORD_AUTHOR,
            },
        })
        res.render('verify-email', {
            email: req.body.inputEmail,
        })
        var verifyNumber = Math.floor(Math.random() * 999999) + 100000;
        userLocal.verifyNumber = verifyNumber;
        let info = await transporter.sendMail({
            from: 'vantinhnguyen728@gmail.com', // sender address
            to: `${req.body.inputEmail}`, // list of receivers
            subject: "Mã xác nhận đăng ký tài khoản Hair Store", // Subject line
            text: "Chào anh, đây là mã xác nhận để đăng ký tài khoản. Anh vui lòng không để lộ, mã sẽ tự động xóa sau 2 phút ", // plain text body
            html: `<p>Chào anh, đây là mã xác nhận để đăng ký tài khoản. Anh vui lòng không để lộ, mã sẽ tự động xóa sau 2 phút</p>
            <h1 style="display:flex">${verifyNumber}</h1>`, // html body
        }).catch(err => { console.log(err) })


        // res.json(userLocal);
    }

    async confirmNumber(req, res) {
        let userLocal = req.app.locals._userRegis;
        let verifyNumberReq = parseInt(req.body.data.verifyNumber);
        let phoneCus = userLocal.phone;
        let nameCus = userLocal.name;
        var date = new Date();
        let dateInsert = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userLocal.password, salt);
        if (verifyNumberReq === userLocal.verifyNumber) {
            let inserAccount = await sequelize.query(`INSERT INTO TaiKhoan(Account,Password,Status,IDRole) 
            VALUES('${userLocal.phone}','${hashedPassword}','Active',1)`, {
                raw: true,
                type: QueryTypes.INSERT,
            })
            let insertCus = await sequelize.query(`
                INSERT INTO Customer(PhoneCustomer,NameCustomer,EmailCustomer,DateCreate)
                 VALUES('${userLocal.phone}',N'${userLocal.name}','${userLocal.email}','${dateInsert}')
                `, {
                raw: true,
                type: QueryTypes.INSERT,
            })
            const encodedToken = () => {
                return JWT.sign({
                    role: 1,
                    accountId: userLocal.phone,
                    nameCustomer: userLocal.name,
                    iat: new Date().getTime(),
                    exp: new Date().setDate(new Date().getDate() + 3)
                }, process.env.SECRET_KEY_ACCESS_TOKEN);
            }
            const token = encodedToken();
            userLocal.name = '';
            userLocal.phone = '';
            userLocal.email = '';
            userLocal.password = '';
            res.status(200).json({
                status: 'success',
                token: token,
                phoneCustomer: phoneCus,
                nameCustomer: nameCus,
            })
        }
        else {
            res.status(200).json({
                status: 'fail verify'
            })
        }
    }

    async sendVerify(req, res) {
        let userLocal = req.app.locals._userRegis;
        let transporter = nodemailer.createTransport({
            type: 'SMTP',
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_ACCOUNT_AUTHOR,
                pass: process.env.EMAIL_PASSWORD_AUTHOR,
            },
        })
        var verifyNumber = Math.floor(Math.random() * 999999) + 100000;
        userLocal.verifyNumber = verifyNumber;
        console.log(verifyNumber)
        res.status(200).json({
            status: 'success',
        })
        let info = await transporter.sendMail({
            from: 'vantinhnguyen728@gmail.com', // sender address
            to: `${req.body.email}`, // list of receivers
            subject: "Mã xác nhận đặt lại mật khẩu tài khoản Hair Store", // Subject line
            text: "Chào anh, đây là mã xác nhận để đặt lại mật khẩu tài khoản. Anh vui lòng không để lộ, mã sẽ tự động xóa sau 2 phút ", // plain text body
            html: `<p>Chào anh, đây là mã xác nhận để đặt lại mật khẩu tài khoản. Anh vui lòng không để lộ, mã sẽ tự động xóa sau 2 phút</p>
            <h1 style="display:flex">${verifyNumber}</h1>`, // html body
        }).catch(err => { console.log(err) })

        await setTimeout(() => {
            userLocal.verifyNumber = Math.floor(Math.random() * 999999) + 100000;
            console.log(userLocal.verifyNumber, "???")
        }, 1000 * 120)
    }

    async setNewPassword(req, res) {
        let userLocal = req.app.locals._userRegis;
        let verifyNumberReq = parseInt(req.body.verifyNumber);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.passwordNew, salt);
        if (verifyNumberReq === userLocal.verifyNumber) {
            var sql = `UPDATE TaiKhoan  SET Password = '${hashedPassword}' 
            FROM TaiKhoan as t,Customer as c 
            WHERE t.Account = c.PhoneCustomer and c.EmailCustomer = '${req.body.email}'`
            await sequelize.query(sql);
            let user = await sequelize.query(`SELECT * FROM TaiKhoan,Customer WHERE Account = PhoneCustomer and Account = '${account}'`)
            if (user[0].length > 0) {
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
            }
        } else {
            res.status(200).json({
                status: "conflict",
                elements: {
                    token: '',
                    nameUser: '',
                    phoneCustomer: ''
                }
            })
        }
    }

}

module.exports = new RegisController;