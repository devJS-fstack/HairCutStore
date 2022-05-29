
const homeRouter = require('./home');
const regisRoute = require('./regis');
const bookingRoute = require('./booking');

const clientController = require('../app/Controllers/Clients/Client')

function route(app) {

    app.use('/regis', regisRoute);
    app.use('/booking', bookingRoute);
    app.use('/introduce-service-all', clientController.introduce_serviceAll)
    app.use('/introduce-style', clientController.introduce_style)
    app.use('/', homeRouter);
}




module.exports = route;