const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');

router.get('/:strategy', cardController.getCardsByStrategy);


module.exports = router;


