const express = require('express');
const router = express.Router();

const homeController = require('../app/Controllers/HomeController')

// newsController.main
router.post('/checkToken', homeController.checkToken)
router.post('/login', homeController.postLogin);
router.get('/', homeController.getMain);

module.exports = router;