const express = require('express');
const router = express.Router();

const index_controller = require('../controllers/indexController');

// Get main/index 
router.get('/', index_controller.get_index);

router.post('/post', index_controller.post_form);

module.exports = router;