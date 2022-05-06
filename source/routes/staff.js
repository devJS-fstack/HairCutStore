const express = require('express');
const router = express.Router();
const StaffController = require('../app/Controllers/Staff/StaffController')


// newsController.main

router.get('/login', StaffController.main);

module.exports = router;