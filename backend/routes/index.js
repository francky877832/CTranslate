const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');

const transcription = require('./transcriptionRoutes')
//console.log("ok")

router.use('/transcription', transcription)

module.exports = router;


