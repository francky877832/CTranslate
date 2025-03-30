const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userController');
const {productsUserApp, userUserApp} = require('../middlewares/multer-config');


//User Route
router.post('/signup', userCtrl.signupUser);
router.get('/login', userCtrl.loginUser);



module.exports = router;