const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    db = require('./database'),
    fs = require('fs'),
    { productRoutes } = require('../app/routes');

app.use(bodyParser.json());

app.use((req, res, next) => {
    req.db = db;
    next();
});

productRoutes(app);

app.use('*', (req, res) => {
    res.status(404).json({ message: `route ${req.originalUrl} does not exists!` });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;