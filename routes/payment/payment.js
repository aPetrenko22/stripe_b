const express = require('express');

const router = express.Router();
const wrap = require('../../utils/routeWrap');

const paymentController = require('./payment.controller');

router.post('/refund', wrap(paymentController.refund));
router.post('/pay', wrap(paymentController.pay));
router.post('/subscription/:id', wrap(paymentController.createSubscription));

module.exports = router;
