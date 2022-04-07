const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../util/sequelizedb');

class BookingController {
    // GET/ news
    async main(req, res, next) {
        let user = req.app.locals._user;
        let service = req.app.locals._service;
        // console.log(req.query.step)
        if (req.query.step == 0) {
            let cus = await sequelize.query(`SELECT * FROM Customer WHERE Phone = '${req.body.inputPhone}'`, {
                raw: true,
                type: QueryTypes.SELECT,
            })
            let store = await sequelize.query(`SELECT * FROM Store WHERE IDStore=${req.query.storeId}`, {
                raw: true,
                type: QueryTypes.SELECT,
            })
            var streetName;
            if (store.length == 0) {
                streetName = "Xem tất cả salon"
            } else {
                streetName = store[0].Street
            }
            //Handle service
            var lengthService;
            var nameServiceBooked = [];
            var objectService = {
                nameService: ''
            };
            var isHaveName = false;
            if (req.body.serviceIds) {
                isHaveName = true;
                service.serviceIds = req.body.serviceIds;
                lengthService = `Đã chọn ${req.body.serviceIds.length} dịch vụ`;
                for (var i = 0; i < service.serviceIds.length; i++) {
                    let ser = await sequelize.query(`SELECT NameService FROM Service WHERE IDService = '${service.serviceIds[i]}'`, {
                        raw: true,
                        type: QueryTypes.SELECT,
                    })
                    objectService.nameService = ser[0].NameService;
                    nameServiceBooked.push(objectService.nameService);
                }
            } else {
                isHaveName = false;
                lengthService = 'Xem tất cả dịch vụ hấp dẫn'
            }
            if (service.serviceIds.length > 0) {
                lengthService = `Đã chọn ${service.serviceIds.length} dịch vụ`;
            }


            // Handle render
            if (cus.length > 0) {
                user.nameUser = cus[0].Name;
                res.render('booking/booking', {
                    name: user.nameUser,
                    phone: cus[0].Phone,
                    street: streetName,
                    lengthService: lengthService,
                    nameServiceBooked: nameServiceBooked,
                    isHaveName: isHaveName,
                })
            }
            else {
                res.render('booking/booking', {
                    name: user.nameUser,
                    street: streetName,
                    lengthService: lengthService,
                    nameServiceBooked: nameServiceBooked,
                    isHaveName: isHaveName,
                })
            }
        }
        else if (req.query.step == 1) {
            await sequelize.query(`SELECT * FROM Store`, {
                raw: true,
                type: QueryTypes.SELECT
            }).then((result) => {
                res.render('booking/booking-salon', {
                    store: result,
                    street: result[0].Street,
                })
            })
        }
        else if (req.query.step == 2) {
            let typeService1 = await sequelize.query(`SELECT * FROM TypeService WHERE IDTypeS=1`, {
                raw: true,
                type: QueryTypes.SELECT
            })
            let typeService2 = await sequelize.query(`SELECT * FROM TypeService WHERE IDTypeS=2`, {
                raw: true,
                type: QueryTypes.SELECT
            })
            let typeService3 = await sequelize.query(`SELECT * FROM TypeService WHERE IDTypeS=3`, {
                raw: true,
                type: QueryTypes.SELECT
            })
            let typeService4 = await sequelize.query(`SELECT * FROM TypeService WHERE IDTypeS=4`, {
                raw: true,
                type: QueryTypes.SELECT
            })
            let item1 = await sequelize.query(`SELECT * FROM Service WHERE TypeService=1`, {
                raw: true,
                type: QueryTypes.SELECT
            })
            let item2 = await sequelize.query(`SELECT * FROM Service WHERE TypeService=2`, {
                raw: true,
                type: QueryTypes.SELECT
            })
            let item3 = await sequelize.query(`SELECT * FROM Service WHERE TypeService=3`, {
                raw: true,
                type: QueryTypes.SELECT
            })
            let item4 = await sequelize.query(`SELECT * FROM Service WHERE TypeService=4`, {
                raw: true,
                type: QueryTypes.SELECT
            })

            if (typeService1 != undefined & typeService2 != undefined & typeService4 != undefined & typeService4 != undefined) {
                res.render('booking/booking-service', {
                    typeService1: typeService1,
                    typeService2: typeService2,
                    typeService3: typeService3,
                    typeService4: typeService4,
                    item1: item1,
                    item2: item2,
                    item3: item3,
                    item4: item4,
                    serviceIds: service.serviceIds,
                });
            }
        }


    }



}

module.exports = new BookingController;