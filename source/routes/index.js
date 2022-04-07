
const homeRouter = require('./home');
const regisRoute = require('./regis');
const bookingRoute = require('./booking');

function route(app) {

    app.use('/regis', regisRoute);
    app.use('/home', homeRouter);
    app.use('/booking', bookingRoute);
    app.use('/', homeRouter);
}




module.exports = route;