
const mysql = require('mysql');
const connection = require('../database/database');

const registerNewGym = async(req, res) => {

    const body = req.body;
    
    const sqlRegister = `INSERT INTO gimnasios SET ?`;

    connection.query(sqlRegister,body, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error register gym',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            console.log('registerNewGym', resp);
            return res.json({
                message: 'gym registered',
                resp
            });
        }
    });
}


const searchGYmByTrainer = async(req, res) => {



    const id = req.params.id;
    
    const sqlRegister = `SELECT * FROM gimnasios WHERE idEntrenador = ${id}`;

    connection.query(sqlRegister, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error searching gym',
                sqlMessage: error.sqlMessage
            });
        }
        else{

            return res.json({
                message: 'gym search',
                resp
            });
        }
    });
}


const getGyms = async(req, res) => {

    const body = req.body;
    
    const sqlRegister = `Select * from gimnasios`;

    connection.query(sqlRegister,body, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error get gym',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            console.log('registerNewGym', resp);
            return res.json({
                message: 'get gyms',
                resp
            });
        }
    });
}





const updateGym = async(req, res) => {

    const {idEntrenador, ...body} = req.body;

    console.log('body', body);

    const sqlRegister = `Update gimnasios SET 
    nombre = '${body.nombre}', 
    ciudad = '${body.ciudad}',
    entidad = '${body.entidad}',
    domicilio = '${body.domicilio}',
    telefono = '${body.telefono}',
    servicios = '${body.servicios}'
    WHERE idEntrenador = ${idEntrenador}`;

    connection.query(sqlRegister,body, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error updating gym',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            console.log('registerNewGym', resp);
            return res.json({
                message: 'update gyms',
                resp
            });
        }
    });

}





module.exports = {
    registerNewGym,
    searchGYmByTrainer,
    getGyms,
    updateGym,
}
