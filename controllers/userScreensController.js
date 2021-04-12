const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const connection = require('../database/database');
//const { generateToken } = require('../middlewares/generateToken');

const getListGeneralTrainers = async(req, res) => {

    
    const sqlRegister = `select * from usuario where usuario.idusuario in ( select idusuario from usuario_Rol where idrol = 2);`;

    connection.query(sqlRegister, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error get list generalTrainers',
                sqlMessage: error.sqlMessage
            });
        }
        else{

            console.log(resp);
            
            return res.json({
                message: 'get list trainers',
                resp
            });
            
        }
    });
}



const getMessages = async(req, res) => {

    console.log(req.params.id);
    const id_relacion_entrenador_usuario = req.params.id;

    const sqlRegister = `SELECT mensajes_string from mensajes WHERE id_relacion_entrenador_usuario = "${id_relacion_entrenador_usuario}"`;

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
        id_relacion_entrenador_usuario,
        idUsuario,
        idEntrenador,
        mensajes_string, 
        lengthMessages} = req.body;


    if(lengthMessages !== 0)
    {
        
        const body = {
            id_relacion_entrenador_usuario,
            idUsuario,
            idEntrenador,
            mensajes_string
        }

        const sqlRegister = `UPDATE mensajes SET mensajes_string = ? WHERE id_relacion_entrenador_usuario="${id_relacion_entrenador_usuario}"`;
    
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
                console.log('mes',resp);
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
            id_relacion_entrenador_usuario,
            idUsuario,
            idEntrenador,
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
