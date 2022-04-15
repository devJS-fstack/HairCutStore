const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../util/sequelizedb');

class BookingController {
    // GET/ news
    async main(req, res, next) {
        let user = req.app.locals._user;
        let service = req.app.locals._service;
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
            var serviceBooked = [];
            var isHaveName = false;
            if (req.body.serviceIds) {
                isHaveName = true;
                service.serviceIds = req.body.serviceIds;
                lengthService = `Đã chọn ${req.body.serviceIds.length} dịch vụ`;
                for (var i = 0; i < service.serviceIds.length; i++) {
                    let ser = await sequelize.query(`SELECT * FROM Service WHERE IDService = '${service.serviceIds[i]}'`, {
                        raw: true,
                        type: QueryTypes.SELECT,
                    })
                    if (ser) serviceBooked.push(ser);
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

            // Handle shift
            let shift = await sequelize.query(`SELECT * FROM Shift`, {
                raw: true,
                type: QueryTypes.SELECT
            })

            var shiftParse = '';
            if (shift) {
                shiftParse = JSON.stringify(shift)
                    ;
            }



            // Handle find all booked

            // --> get next 5 date from date current
            var dateCurrent = new Date();
            var date2 = new Date(dateCurrent);
            date2.setDate(dateCurrent.getDate() + 1);
            var date3 = new Date(dateCurrent);
            date3.setDate(dateCurrent.getDate() + 2);
            var date4 = new Date(dateCurrent);
            date4.setDate(dateCurrent.getDate() + 3);
            var date5 = new Date(dateCurrent);
            date5.setDate(dateCurrent.getDate() + 4);
            var date6 = new Date(dateCurrent);
            date6.setDate(dateCurrent.getDate() + 5);



            // query all staff regis FROM 6 day,store 

            let staffsInDate1 = await sequelize.query(`SELECT * FROM Staff as s, Store as st, RegisShift as r 
           WHERE s.IDStore = st.IDStore AND s.IDStore = ${req.query.storeId}
            AND s.IDStaff = r.IDStaff
             AND r.DateRegis = '${dateCurrent.getFullYear()}-${dateCurrent.getMonth() + 1}-${dateCurrent.getDate()}'`, {
                raw: true,
                type: QueryTypes.SELECT,
            })
            let staffsInDate2 = await sequelize.query(`SELECT * FROM Staff as s, Store as st, RegisShift as r 
           WHERE s.IDStore = st.IDStore AND s.IDStore = ${req.query.storeId}
            AND s.IDStaff = r.IDStaff
             AND r.DateRegis = '${date2.getFullYear()}-${date2.getMonth() + 1}-${date2.getDate()}'`, {
                raw: true,
                type: QueryTypes.SELECT,
            })
            let staffsInDate3 = await sequelize.query(`SELECT * FROM Staff as s, Store as st, RegisShift as r 
           WHERE s.IDStore = st.IDStore AND s.IDStore = ${req.query.storeId}
            AND s.IDStaff = r.IDStaff
             AND r.DateRegis = '${date3.getFullYear()}-${date3.getMonth() + 1}-${date3.getDate()}'`, {
                raw: true,
                type: QueryTypes.SELECT,
            })

            let staffsInDate4 = await sequelize.query(`SELECT * FROM Staff as s, Store as st, RegisShift as r 
           WHERE s.IDStore = st.IDStore AND s.IDStore = ${req.query.storeId}
            AND s.IDStaff = r.IDStaff
             AND r.DateRegis = '${date4.getFullYear()}-${date4.getMonth() + 1}-${date4.getDate()}'`, {
                raw: true,
                type: QueryTypes.SELECT,
            })

            let staffsInDate5 = await sequelize.query(`SELECT * FROM Staff as s, Store as st, RegisShift as r 
           WHERE s.IDStore = st.IDStore AND s.IDStore = ${req.query.storeId}
            AND s.IDStaff = r.IDStaff
             AND r.DateRegis = '${date5.getFullYear()}-${date5.getMonth() + 1}-${date5.getDate()}'`, {
                raw: true,
                type: QueryTypes.SELECT,
            })

            let staffsInDate6 = await sequelize.query(`SELECT * FROM Staff as s, Store as st, RegisShift as r 
           WHERE s.IDStore = st.IDStore AND s.IDStore = ${req.query.storeId}
            AND s.IDStaff = r.IDStaff
             AND r.DateRegis = '${date6.getFullYear()}-${date6.getMonth() + 1}-${date6.getDate()}'`, {
                raw: true,
                type: QueryTypes.SELECT,
            })
            staffsInDate1 = JSON.stringify(staffsInDate1);
            staffsInDate2 = JSON.stringify(staffsInDate2);
            staffsInDate3 = JSON.stringify(staffsInDate3);
            staffsInDate4 = JSON.stringify(staffsInDate4);
            staffsInDate5 = JSON.stringify(staffsInDate5);
            staffsInDate6 = JSON.stringify(staffsInDate6);
            serviceBooked = JSON.stringify(serviceBooked);

            let bookedInDate1 = await sequelize.query(`SELECT * FROM Book 
            WHERE DateBook ='${dateCurrent.getFullYear()}-${dateCurrent.getMonth() + 1}-${dateCurrent.getDate()}' `, {
                raw: true,
                type: QueryTypes.SELECT
            })

            let bookedInDate2 = await sequelize.query(`SELECT * FROM Book 
            WHERE DateBook ='${date2.getFullYear()}-${date2.getMonth() + 1}-${date2.getDate()}' `, {
                raw: true,
                type: QueryTypes.SELECT
            })

            let bookedInDate3 = await sequelize.query(`SELECT * FROM Book 
            WHERE DateBook ='${date3.getFullYear()}-${date3.getMonth() + 1}-${date3.getDate()}' `, {
                raw: true,
                type: QueryTypes.SELECT
            })

            let bookedInDate4 = await sequelize.query(`SELECT * FROM Book 
            WHERE DateBook ='${date4.getFullYear()}-${date4.getMonth() + 1}-${date4.getDate()}' `, {
                raw: true,
                type: QueryTypes.SELECT
            })

            let bookedInDate5 = await sequelize.query(`SELECT * FROM Book 
            WHERE DateBook ='${date5.getFullYear()}-${date5.getMonth() + 1}-${date5.getDate()}' `, {
                raw: true,
                type: QueryTypes.SELECT
            })

            let bookedInDate6 = await sequelize.query(`SELECT * FROM Book 
            WHERE DateBook ='${date6.getFullYear()}-${date6.getMonth() + 1}-${date6.getDate()}' `, {
                raw: true,
                type: QueryTypes.SELECT
            })


            bookedInDate1 = JSON.stringify(bookedInDate1);
            bookedInDate2 = JSON.stringify(bookedInDate2);
            bookedInDate3 = JSON.stringify(bookedInDate3);
            bookedInDate4 = JSON.stringify(bookedInDate4);
            bookedInDate5 = JSON.stringify(bookedInDate5);
            bookedInDate6 = JSON.stringify(bookedInDate6);
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
                    shiftParse: shiftParse,
                    staffsInDate1: staffsInDate1,
                    staffsInDate2: staffsInDate2,
                    staffsInDate3: staffsInDate3,
                    staffsInDate4: staffsInDate4,
                    staffsInDate5: staffsInDate5,
                    staffsInDate6: staffsInDate6,
                    bookedInDate1: bookedInDate1,
                    bookedInDate2: bookedInDate2,
                    bookedInDate3: bookedInDate3,
                    bookedInDate4: bookedInDate4,
                    bookedInDate5: bookedInDate5,
                    bookedInDate6: bookedInDate6,
                    serviceBooked: serviceBooked,
                })
            }
            else {
                res.render('booking/booking', {
                    name: user.nameUser,
                    street: streetName,
                    lengthService: lengthService,
                    nameServiceBooked: nameServiceBooked,
                    isHaveName: isHaveName,
                    shiftParse: shiftParse,
                    staffsInDate1: staffsInDate1,
                    staffsInDate2: staffsInDate2,
                    staffsInDate3: staffsInDate3,
                    staffsInDate4: staffsInDate4,
                    staffsInDate5: staffsInDate5,
                    staffsInDate6: staffsInDate6,
                    bookedInDate1: bookedInDate1,
                    bookedInDate2: bookedInDate2,
                    bookedInDate3: bookedInDate3,
                    bookedInDate4: bookedInDate4,
                    bookedInDate5: bookedInDate5,
                    bookedInDate6: bookedInDate6,
                    serviceBooked: serviceBooked,
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
        else if (req.query.step == 3) {
            let lengthBook = await sequelize.query(`SELECT Count(IDBook) as length FROM Book`, {
                raw: true,
                type: QueryTypes.SELECT
            })
            let lengthBooked = lengthBook[0].length + 1;
            if (lengthBook) {
                let insertBook = await sequelize.query(`
                INSERT INTO Book
                ([IDBook]
                ,[IDShiftBook]
                ,[DateBook]
                ,[Payment]
                ,[PhoneCustomer]
                ,[IDStore]
                ,[IDStaff]
                ,[Status])
          VALUES
                (${lengthBooked},${req.body.idShiftBook},'${req.body.dateBook}',${req.body.payment},'${req.body.phoneBook}',${req.query.storeId},'${req.body.staffBook}',N'Đã đặt lịch')
                `
                    , {
                        raw: true,
                        type: QueryTypes.INSERT
                    });
                var servicesBooked = req.body.servicesBook;
                if (insertBook) {
                    for (var i = 0; i < servicesBooked.length; i++) {
                        let insertBookItem = await sequelize.query(`
                        INSERT INTO BookItem(IDBook,IDService)
                        VALUES (${lengthBooked},${servicesBooked[i]})
                        `)
                    }
                }

                res.json(req.body);
            }

        }


    }



}

module.exports = new BookingController;