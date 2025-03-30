const express = require('express');
const {connectDB, mongoose} = require('./shared/db');
const routes = require('./routes');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');

const app = express();

connectDB()

app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      next();
    });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//console.log('Ok')

app.use('/api/auth', userRoutes);

app.use('/api/datas', routes);



module.exports = app;
