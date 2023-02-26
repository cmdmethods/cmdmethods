const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');

router.get('/:strategy', cardController.getCardsByStrategy);
router.get('/:strategy/:id', cardController.getCardById);

module.exports = router;


