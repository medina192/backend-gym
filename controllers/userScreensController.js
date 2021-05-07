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



const getStatistics = async(req, res) => {

    console.log(req.params.id);
    const idUsuario = req.params.id;

    const sqlRegister = `SELECT * from estadisticas WHERE idUsuario = "${idUsuario}"`;

    connection.query(sqlRegister, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error get list statistics',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            
            console.log('res get statistics',resp);
            return res.json({
                message: 'get list statistics',
                resp
            });
        }
    });
}



const createUserStatistics = async(req, res) => {

    const body = req.body;

    const sqlRegister = `Insert into estadisticas SET ?`;

    connection.query(sqlRegister, body, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error get create statistics',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            
            console.log('res get create statistics',resp);
            return res.json({
                message: 'get list create statistics',
                resp
            });
        }
    });
}



const updateUserStatistics = async(req, res) => {


    const idUsuario = req.params.id;
    const body = req.body;

    const sqlRegister = `Update estadisticas SET = ? WHERE idusuario = "${idUsuario}"`;

    connection.query(sqlRegister, body, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error get update statistics',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            
            console.log('res get update statistics',resp);
            return res.json({
                message: 'get list update statistics',
                resp
            });
        }
    });
}



const getWorkByMMuscle = async(req, res) => {


    const idUsuario = req.params.id;

    const sqlRegister = `SELECT trabajo_por_musculo from estadisticas WHERE idUsuario = "${idUsuario}"`;

    connection.query(sqlRegister, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error get list work muscle',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            
            console.log('res get work muscle',resp[0].trabajo_por_musculo);
            return res.json({
                message: 'get list work muscle',
                resp: resp[0].trabajo_por_musculo
            });
        }
    });
}


const updateWorkByMuscle = async(req, res) => {


    const idUsuario = req.params.id;
    const body = req.body;

    const exercisesString = body.bodyString;
    

    const sqlRegister = `Update estadisticas SET trabajo_por_musculo = '${exercisesString}'  WHERE idUsuario = "${idUsuario}"`;

    connection.query(sqlRegister, body, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error update muscle',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            
            console.log('res get update muscle',resp);
            return res.json({
                message: 'get list update muscle',
                resp
            });
        }
    });
    
}


const getMeasures = async(req, res) => {


    const idUsuario = req.params.id;

    const sqlRegister = `SELECT registro_peso from estadisticas WHERE idUsuario = "${idUsuario}"`;

    connection.query(sqlRegister, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error get list weight muscle',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            
            console.log('res get work muscle',resp[0].trabajo_por_musculo);
            return res.json({
                message: 'get list weight muscle',
                resp
            });
        }
    });
}




const updateMeasures = async(req, res) => {


    const idUsuario = req.params.id;
    const body = req.body;

    const exercisesString = body.bodyString;
    console.log('body s', exercisesString);
    const sqlRegister = `Update estadisticas SET registro_peso = '${exercisesString}'  WHERE idUsuario = "${idUsuario}"`;

    connection.query(sqlRegister, body, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error update measures',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            
            console.log('res get update muscle',resp);
            return res.json({
                message: 'get list update measures',
                resp
            });
        }
    });
    
}




module.exports = {
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
}
