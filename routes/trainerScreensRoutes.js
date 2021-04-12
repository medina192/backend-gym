//  /userscreens/

const { Router } =require('express');
const { 
    getListGeneralTrainers,
    userSendMessage,
    getMessages
} = require('../controllers/userScreensController');

const router = Router();

router.get('/getlistgeneraltrainers', getListGeneralTrainers);
router.put('/usersendmessage', userSendMessage);
router.get('/getmessages/:email', getMessages);

module.exports = router;