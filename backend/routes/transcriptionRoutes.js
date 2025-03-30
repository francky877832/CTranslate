const express = require('express');
const router = express.Router();

const transcriptionController = require('../controllers/transcriptionController');
const { audioUpload } = require('../middlewares/multer-config');

//console.log("damn")
//User Route
router.post('/audio', audioUpload.single('audio'), transcriptionController.googleSpeechTotext);
router.post('/text', transcriptionController.googleTextToSpeech);



module.exports = router;