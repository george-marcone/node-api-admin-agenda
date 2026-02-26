'use strict'
const express = require('express');
const router = express.Router();
const auth = require('../services/auth');

router.get('/uploads', auth.authorize);
router.get('/ebooks', auth.authorize);
router.get('/images', auth.authorize);

module.exports = router;