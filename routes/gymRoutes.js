

//   /gyms

const { Router } =require('express');
const { 
    registerNewGym,
    searchGYmByTrainer,
    getGyms,
    updateGym,
} = require('../controllers/gymController');

const router = Router();

router.post('/registergym', registerNewGym);
router.get('/searchgym/:id', searchGYmByTrainer);
router.get('/getgyms', getGyms);
router.put('/updategym', updateGym);



module.exports = router;
