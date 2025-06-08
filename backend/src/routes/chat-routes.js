const express = require('express');
const sendMessage = require('../controllers/messages/sendMessage');
const protectRoute = require('../middleware/protect_route');
const getMessages = require('../controllers/messages/getMessages');

const router = express.Router();

// http://localhost:5999/api/auth/signup
router.get('/getmessages/:id',protectRoute,getMessages);
router.post('/sendmessage/:id',protectRoute,sendMessage);

module.exports = router;