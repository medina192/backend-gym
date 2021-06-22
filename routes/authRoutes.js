//  /auth/

const { Router } =require('express');
const { registerNewUser, logIn, saveRol, updateAfterSaveRol,
    getRol
} = require('../controllers/authController');

const router = Router();

router.post('/register', registerNewUser);
router.post('/login', logIn);
router.post('/registerrol', saveRol);
router.post('/registerafterrol', updateAfterSaveRol);
router.get('/getrol/:idrol', getRol);


module.exports = router;