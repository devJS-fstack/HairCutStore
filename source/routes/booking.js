const express = require('express');
const router = express.Router();

const bookingController = require('../app/Controllers/BookingController')

// newsController.main
router.post('/', bookingController.main);

module.exports = router;