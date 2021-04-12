//  /relations/

const { Router } =require('express');
const { 
    registerRelation,
    searchRelations,
    getMyTrainers,
    getMyTrainersInformation,
    getMyUsers,
    relationChangeStatus,
    sendEmail,
    saveRoutineByTrainer,
    getRoutines,
    getRoutinesByUser,
    getTrainersOfRoutines,
} = require('../controllers/relationController');


const router = Router();

router.post('/registerRelation', registerRelation);
router.get('/getrelation/:email_usuario_entrenador', searchRelations);
router.get('/getmytrainers/:email_usuario',getMyTrainers);
router.get('/searchforatrainer/:email_trainer', getMyTrainersInformation);
//router.get('/getmytrainers/:email_entrenador',getMyTrainers);
router.get('/getmyusers/:email_entrenador',getMyUsers);
router.put('/updatestatus', relationChangeStatus);
router.post('/sendemail', sendEmail);
router.post('/saveroutinebytrainer', saveRoutineByTrainer);
router.get('/getroutines/:id', getRoutines);
router.get('/getRoutinesByUser/:id', getRoutinesByUser);
router.get('/gettrainersofroutines/:id',getTrainersOfRoutines);
//mdylhgmtnfnpqfif

module.exports = router;

/*
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const c = new Date(year + 1, month, day) // PLUS 1 YEAR
    const d = new Date(year, month + 1, day) // PLUS 1 MONTH
    const f = new Date(year, month, day  + 1) // PLUS 1 DAY

    let tomorrow = new Date();
tomorrow = moment(tomorrow).add(1, 'day').format('YYYY-MM-DD'); // for specific format

let today = moment(new Date()).format('YYYY-MM-DD');

let tomorrow = new Date();
tomorrow = moment(tomorrow).add(1, 'day').format('YYYY-MM-DD');
*/