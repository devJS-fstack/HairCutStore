const express = require('express');
const app = express();
var morgan = require('morgan');
const path = require('path');
const port = process.env.PORT || 3900;

const route = require('./routes/index');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const nameUserMiddle = require('./app/middlewares/NameUserMiddleware')
const serviceMiddle = require('./app/middlewares/ServiceMiddleware');
const { connectData } = require('./util/sequelizedb');
const { sequelize } = require('./util/sequelizedb');
const { QueryTypes } = require('sequelize');





app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
connectData();


app.engine('hbs', handlebars({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
        returnItem: (index) => {
            if (index == 0) return `item1`;
            else if (index == 1) return `item2`;
            else if (index == 2) return `item3`;
            else if (index == 3) return `item4`;
        }
    }
}))
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, 'resource/views'));
// app.use(morgan('combined'));
app.locals._user = {
    nameUser: '',
    arr: [],
}
app.locals._service = {
    serviceIds: [],
}
app.use(nameUserMiddle);
app.use(serviceMiddle);
route(app);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
