const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const connection = require('../database/database');
//const { generateToken } = require('../middlewares/generateToken');

const getListUsers = async(req, res) => {

    
    console.log(req.params.email);
    const email_usuario_entrenador = req.params.email;

    const sqlRegister = `SELECT mensajes_string from mensajes WHERE email_usuario_entrenador = "${email_usuario_entrenador}"`;

    connection.query(sqlRegister, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error get list messages',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            console.log('trainer user', email_usuario_entrenador);
            console.log('res get messages',resp);
            return res.json({
                message: 'get list messages',
                resp
            });
        }
    });
}



const getMessages = async(req, res) => {

    console.log(req.params.email);
    const email_usuario_entrenador = req.params.email;

    const sqlRegister = `SELECT mensajes_string from mensajes WHERE email_usuario_entrenador = "${email_usuario_entrenador}"`;

    connection.query(sqlRegister, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error get list messages',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            console.log('trainer user', email_usuario_entrenador);
            console.log('res get messages',resp);
            return res.json({
                message: 'get list messages',
                resp
            });
        }
    });
}





const userSendMessage = async(req, res) => {


    const {
        email_usuario, 
        email_entrenador, 
        email_usuario_entrenador, 
        mensajes_string, 
        lengthMessages} = req.body;


    if(lengthMessages !== 0)
    {
        console.log('if');
        const body = {
            email_usuario, 
            email_entrenador, 
            email_usuario_entrenador, 
            mensajes_string
        }

        const sqlRegister = `UPDATE mensajes SET mensajes_string = ? WHERE email_usuario_entrenador="${email_usuario_entrenador}"`;
    
        connection.query(sqlRegister, body, (error, resp) => {
            if(error)
            {   
                console.log(error.sqlMessage);
                return res.status(400).json({
                    ok: false,
                    message: 'error saving message + ',
                    sqlMessage: error.sqlMessage
                });
            }
            else{
                return res.json({
                    message: 'user ssaving message +',
                    resp
                });
            }
        });
    }
    else{
        console.log('else');
        console.log(mensajes_string);
        const body = {
            email_usuario,
            email_entrenador,
            email_usuario_entrenador,
            mensajes_string
        }
        
        const sqlRegister = `INSERT INTO mensajes SET ?`;
    
        connection.query(sqlRegister,body, (error, resp) => {
            if(error)
            {   
                console.log(error.sqlMessage);
                return res.status(400).json({
                    ok: false,
                    message: 'error saving message [0] ',
                    sqlMessage: error.sqlMessage
                });
            }
            else{
                return res.json({
                    message: 'user ssaving message [0]',
                    resp
                });
            }
        });
    }


}


module.exports = {
    getListGeneralTrainers,
    userSendMessage,
    getMessages,
}
