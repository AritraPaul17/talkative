const express = require('express');
const login = require('../controllers/authusers/login');
const signup = require('../controllers/authusers/signup');
const logout = require('../controllers/authusers/logout');
const setAvatar = require('../controllers/authusers/setAvatar');
const protectRoute = require('../middleware/protect_route');
const getuser = require('../controllers/authusers/getUser');
const getAllUser = require('../controllers/authusers/getAllUser');
const addFriend = require('../controllers/authusers/addFriend');
const getFriend = require('../controllers/authusers/getFriend');

const router = express.Router();

// http://localhost:5999/api/auth/signup
router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',protectRoute,logout);

router.put('/setavatar',protectRoute,setAvatar);
router.get('/getuser',protectRoute,getuser);

// for getting all users
router.get('/getalluser',protectRoute,getAllUser);

// for getting all freinds
router.post('/addfriend',protectRoute,addFriend);
router.get('/getfriends',protectRoute,getFriend);



module.exports = router;