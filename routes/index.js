const express = require('express');

const router = express.Router();

const payRouter = require('./payment/payment');
/* GET home page. */
router.use('/payment', payRouter);

module.exports = router;
