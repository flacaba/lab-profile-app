const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const secure = require('../middleware/secure.mid')

router.post('/register', auth.register);
router.get('/profile', secure.isAuthenticated, auth.getProfile);
router.post('/authenticate', auth.authenticate)




module.exports = router;
