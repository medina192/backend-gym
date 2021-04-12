
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const connection = require('../database/database');
//const { generateToken } = require('../middlewares/generateToken');

const registerNewUser = async(req, res) => {

    const body = req.body;

    let salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);
    
    const sqlRegister = `INSERT INTO usuario SET ?`;

    connection.query(sqlRegister,body, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error register user',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            console.log(resp);
            return res.json({
                message: 'user registered',
                resp
            });
        }
    });
}


const updateAfterSaveRol = async(req, res) => {

    const {idusuario, ...body} = req.body;

    console.log(body);
    
    const sqlRegister = `UPDATE usuario SET descripcion_entrenador = "${body.descripcion_entrenador}", cedula_entrenador = "${body.cedula_entrenador}" WHERE idusuario="${idusuario}"`;

    connection.query(sqlRegister, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error register user after rol',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            console.log(resp);
            return res.json({
                message: 'user registered after rol',
                resp
            });
        }
    });
}

const saveRol = async(req, res) => {
    
    const body = req.body;
    
    const sqlRegister = `INSERT INTO usuario_Rol SET ?`;

    connection.query(sqlRegister,body, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error register rol',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            console.log(resp);
            return res.json({
                message: 'rol registered',
                resp
            });
        }
    });
}



const logIn = async(req, res) => {


    const { email, password } = req.body;
    
    const sqlVerifyEmail = `SELECT * FROM usuario WHERE email="${email}"`;



        connection.query(sqlVerifyEmail, (error, resp) => {
            
            if(resp.length > 0)
            {
                const passwordMatches = bcrypt.compareSync(password, resp[0].password);
                
                if(passwordMatches)
                {
                    return res.json({
                        message: 'user logged',
                        resp
                    });
                }
                else{
                    
                    return res.status(400).json({
                        ok: false,
                        message: 'the email or password don´t match',
                        error
                    });
                }
            }
            else{
                console.log('the email does not exist')
                return res.status(400).json({
                    ok: false,
                    message: 'the email does not exists',
                    error
                });
            }
        });
}


const getRol = async(req, res) => {

    const idrol = req.params.idrol;

    
    
    const sqlRegister = `Select idrol from usuario_Rol WHERE idusuario="${idrol}"`;

    connection.query(sqlRegister, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error getting rol',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            console.log(resp);
            return res.json({
                message: 'get rol',
                resp
            });
        }
    });
}


module.exports = {
    registerNewUser,
    logIn,
    saveRol,
    updateAfterSaveRol,
    getRol,
}
