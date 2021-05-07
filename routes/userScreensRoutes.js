//  /userscreens/

const { Router } =require('express');
const { 
    getListGeneralTrainers,
    userSendMessage,
    getMessages,
    getStatistics,
    getWorkByMMuscle,
    updateWorkByMuscle,
    createUserStatistics,
    updateUserStatistics,
    getMeasures,
    updateMeasures,
} = require('../controllers/userScreensController');

const router = Router();

router.get('/getlistgeneraltrainers', getListGeneralTrainers);
router.put('/usersendmessage', userSendMessage);
router.get('/getmessages/:id', getMessages);
router.get('/getstatistics/:id', getStatistics);
router.get('/getworkbymuscle/:id', getWorkByMMuscle);
router.post('/updateworkbymuscle/:id', updateWorkByMuscle);
router.post('/createuserstatistics', createUserStatistics);
router.put('/updateuserstatistcis/:id',updateUserStatistics);
router.get('/getmeasures/:id', getMeasures);
router.put('/updatemeasures/:id', updateMeasures);

module.exports = router;