const express = require('express');
const router = express.Router();

const homeController = require('../app/Controllers/HomeController')

// newsController.main
router.post('/login', homeController.login);
router.post('/regis', homeController.regis)
router.get('/', homeController.main);

module.exports = router;