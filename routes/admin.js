const router = require('express').Router();
const { getAllUsers, findUser, loginPage, register, allUsers, chatUser, gozareshat, contacts, programList, } = require('../controller/AdminController');
router.post('/get-all', getAllUsers);
router.post('/find-user', findUser);
router.get("/login", loginPage);
router.get("/logout", loginPage);
router.get("/register", register);
router.get("/users", allUsers);
router.get("/user-chats/:slug", chatUser);
router.get("/gozaresh/:slug", gozareshat);
router.get("/contacts/:slug", contacts);
router.get("/programm-list/:slug", programList);
module.exports = router