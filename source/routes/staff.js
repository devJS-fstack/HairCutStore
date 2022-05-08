const express = require('express');
const router = express.Router();
const StaffController = require('../app/Controllers/Staff/StaffController')


// newsController.main
router.get('/service', StaffController.service)
router.get('/dashboard-manager', StaffController.dashboard)
router.post('/login', StaffController.login);
router.get('/', StaffController.main);

module.exports = router;