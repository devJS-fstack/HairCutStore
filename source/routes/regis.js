const express = require('express');
const router = express.Router();

const regisController = require('../app/Controllers/RegisController')

// newsController.main
router.post('/stored', regisController.createUser)
router.get('/', regisController.main)

module.exports = router;