const express = require('express');
const router = express.Router();
const StaffController = require('../app/Controllers/Staff/StaffController')


// newsController.main
router.post('/service/edit-category', StaffController.editCategory)
router.post('/service/delete-category', StaffController.deleteCategory)
router.post('/service/create-category', StaffController.createCategory)
router.post('/service/employee-service', StaffController.employService)
router.get('/service', StaffController.service)
router.get('/dashboard-manager', StaffController.dashboard)
router.post('/login', StaffController.login);
router.get('/', StaffController.main);

module.exports = router;