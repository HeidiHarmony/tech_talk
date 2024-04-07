const express = require('express');
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');

// Log incoming requests
router.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
    next();
  });

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
