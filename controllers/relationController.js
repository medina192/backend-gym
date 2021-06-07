const mysql = require('mysql');
const connection = require('../database/database');
//const { generateToken } = require('../middlewares/generateToken');
const nodemailer = require("nodemailer");
//const { transporter } = require('../services/sendEmail');
const { google } = require('googleapis');

const registerRelation = async(req, res) => {
    
    const sqlRegister = `INSERT INTO relacion_entrenador_usuario SET ?`;

    const body = req.body;

    console.log(body);

    connection.query(sqlRegister, body, (error, resp) => {
        if(error)
        {   
            console.log('error');
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error register relation',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            return res.json({
                message: 'relation saved',
                resp
            });
        }
    });
}



const searchRelations = async(req, res) => {


    const email_usuario_entrenador = req.params.email_usuario_entrenador;


    //const sqlRegister = `SELECT * from relacion_entrenador_usuario WHERE emailkey = '${email_usuario_entrenador}' `;
      const sqlRegister = `SELECT * from relacion_entrenador_usuario WHERE email_usuario_entrenador = "${email_usuario_entrenador}"`;
    connection.query(sqlRegister, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error get relations',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            
            return res.json({
                message: 'get list relations',
                resp
            });
        }
    });
}


const getMyTrainers = async(req, res) => {


    const email_usuario = req.params.email_usuario;

    

    //const sqlRegister = `SELECT * from relacion_entrenador_usuario WHERE emailkey = '${email_usuario_entrenador}' `;
      const sqlRegister = `SELECT email_entrenador from relacion_entrenador_usuario WHERE email_usuario = "${email_usuario}"`;
    
      connection.query(sqlRegister, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error get relations',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            
            console.log('res get relations',resp);
            return res.json({
                message: 'get list relations',
                resp
            });
        }
    });
}


const getMyUsers = async(req, res) => {


    const email_entrenador = req.params.email_entrenador;

   

    //const sqlRegister = `SELECT * from relacion_entrenador_usuario WHERE emailkey = '${email_usuario_entrenador}' `;
      const sqlRegister = `SELECT * from relacion_entrenador_usuario WHERE email_entrenador = "${email_entrenador}"`;
    
      connection.query(sqlRegister, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error get relations',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            
            console.log('res get relations',resp);
            return res.json({
                message: 'get list relations',
                resp
            });
        }
    });
}



const relationChangeStatus = async(req, res) => {

    const { email_usuario_entrenador, ...body} = req.body;
    console.log('body', body);


    const sqlRegister = `UPDATE relacion_entrenador_usuario SET estado_subscripcion = ? WHERE email_usuario_entrenador="${email_usuario_entrenador}"`;
    
        connection.query(sqlRegister, body, (error, resp) => {
            if(error)
            {   
                console.log(error.sqlMessage);
                return res.status(400).json({
                    ok: false,
                    message: 'error updating status',
                    sqlMessage: error.sqlMessage
                });
            }
            else{
                return res.json({
                    message: 'user saving status',
                    resp
                });
            }
        });

}





const getMyTrainersInformation = async(req, res) => {

    const email_trainer = req.params.email_trainer;

    


    //const sqlRegister = `SELECT * from relacion_entrenador_usuario WHERE emailkey = '${email_usuario_entrenador}' `;
      const sqlRegister = `SELECT * from usuario WHERE email = "${email_trainer}"`;
    
      connection.query(sqlRegister, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error get trainer',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            
            console.log('res get relations',resp);
            return res.json({
                message: 'gettrainer',
                resp
            });
        }
    });
}

const sendEmail = async(req, res) => {
    
    const clientId = '819621055608-kt00p0gj0cpsdajs39ob1a582l3pk9fl.apps.googleusercontent.com';
    const secret = 'tt10I_wh-CfuzCXZCpVdKRPk';
    const redirectUri = 'https://developers.google.com/oauthplayground';
    const refreshToken = '1//04VfUVGGvbXLNCgYIARAAGAQSNwF-L9IrOTpbQlyBmLZFj8e9jAT3VnBFjjTwBzBTZylTSTZbpDjbAP37dBcTQ9PmEQueYcAflqM';

    const oAuthClient = new google.auth.OAuth2(clientId, secret, redirectUri);

    oAuthClient.setCredentials({refresh_token: refreshToken});

    const sendMail = async() => {

        try {
            const accessToken = await oAuthClient.getAccessToken();
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: "diaz.medina.cb84@gmail.com",
                    clientId: clientId,
                    clientSecret: secret,
                    refreshToken: refreshToken,
                    accessToken: accessToken
                }
            });
            const mailOptions = {
                from: "Correo prueba <diaz.medina.cb84@gmail.com>",
                to: "elmarroalejandro123@gmail.com",
                //to: "elmarroalejandro123@gmail.com",
                subject: "Asunto prueba gym room",
                html: "<p>Correo enviado exitosamente</p>"
            };
            const result = await transporter.sendMail(mailOptions);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    sendMail()
        .then(result => {
            console.log('result', result);
            return res.json({
                result
            });
        })
        .catch(error => console.log(error.message));
   
    /*
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      name: 'http://localhost:3001',
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'elijah.altenwerth@ethereal.email', // generated ethereal user
        pass: 'YhzWyqbW5UecV3efpy', // generated ethereal password
      },
      logger: true,
debug: true
    });

    let mailOptions = {
        from: 'elijah.altenwerth@ethereal.email', // sender address
        to: "<ja.diazmedina@ugto.mx>", // list of receivers
        subject: "Hello", // Subject line
        text: "Hello world?", // plain text body
    }
  
    // send mail with defined transport object
    transporter.sendMail( mailOptions, (error, info) => {
        if(error)
        {
            console.log(error);
            return res.status(500).send(error);
        }
        else{
            console.log(info);
            return res.json({
                info
            });
        }
    });
*/
   /*
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.email",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "diaz.medina.cb84@gmail.com", // generated ethereal user
          pass: 'mdylhgmtnfnpqfif', // generated ethereal password
        },
      });
      let mailOptions = {
        from: 'diaz.medina.cb84@gmail.com', // sender address
        to: "ja.diazmedina@ugto.mx", // list of receivers
        subject: "Hello gmail", // Subject line
        text: "Hello world?", // plain text body
    }
  
    // send mail with defined transport object
    transporter.sendMail( mailOptions, (error, info) => {
        if(error)
        {
            console.log(error);
            return res.status(500).send(error);
        }
        else{
            console.log(info);
            return res.json({
                info
            });
        }
    });
  */
} 


const saveRoutineByTrainer = async(req, res) => {

    const body = req.body;

    const sqlRegister = `INSERT INTO rutinas SET ?`;

    connection.query(sqlRegister,body, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error saving routine trainer',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            
            console.log('res saving routine trainer',resp);
            return res.json({
                message: 'gettrainer',
                resp
            });
        }
    });
}


const updateRoutineByTrainer = async(req, res) => {

    const body = req.body;
    console.log('body', body);
    const idRutina = req.params.id;
    console.log('id', idRutina);

    const sqlRegister = `Update rutinas SET tipo = '${body.tipo}', ejercicios = '${body.ejercicios}',
    id_relacion_entrenador_usuario = '${body.id_relacion_entrenador_usuario}',
    idUsuario = '${body.idUsuario}', nombre = '${body.nombre}' WHERE idRutinas = "${idRutina}";`;

    connection.query(sqlRegister,body, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error update routine trainer',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            
            console.log('res update routine trainer',resp);
            return res.json({
                message: 'routine updated',
                resp
            });
        }
    });
}




const getRoutinesByUser = (req, res) => {
    
    const id =  req.params.id;


    const sqlRegister = `SELECT * FROM rutinas WHERE idUsuario = ${id}`;

    connection.query(sqlRegister, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error getting routine',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            
            console.log('res get routine user',resp);
            return res.json({
                message: 'get routines',
                resp
            });
        }
    });

}



const getRoutines = async(req, res) => {
    
    const id =  req.params.id;  

    const sqlRegister = `SELECT * FROM rutinas WHERE id_relacion_entrenador_usuario = ${id}`;

    connection.query(sqlRegister, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error getting routine',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            
            console.log('res saving routine',resp);
            return res.json({
                message: 'get routines',
                resp
            });
        }
    });
}



const getTrainersOfRoutines = async(req, res) => {
    
    const id = req.params.id;

    const sqlRegister = `select * from usuario where usuario.idusuario in (select idEntrenador from relacion_entrenador_usuario where id_relacion_entrenador_usuario = ${id} );`;

    connection.query(sqlRegister, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error getting routine',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            
            console.log('res saving routine',resp);
            return res.json({
                message: 'get routines',
                resp
            });
        }
    });

}


const getSavedRoutinesByTrainer = async(req, res) =>{

    const idTrainer = req.params.id;

    const getIdsRelationsTrainer = new Promise((resolve, reject) => {

        const sqlRegister = `select id_relacion_entrenador_usuario from  relacion_entrenador_usuario where idEntrenador = '${idTrainer}';`;

        connection.query(sqlRegister, (error, resp) => {
            if(error)
            {   
                console.log(error.sqlMessage);
                reject(res.status(400).json({
                    ok: false,
                    message: 'error getting ids',
                    sqlMessage: error.sqlMessage
                }));
            }
            else{
                resolve(resp);
            }
        });
    });

    let auxArrrayIds = [];

    try {
        const ids = await getIdsRelationsTrainer;

        
        for(let i = 0; i < ids.length; i++)
        {
            
            auxArrrayIds[i] = ids[i].id_relacion_entrenador_usuario;
        }
        

    } catch (error) {
        console.log('error promises ids');
    }

    let auxSqlLine = '';

    for(let i = 0; i < auxArrrayIds.length; i++)
    {
        auxSqlLine += auxArrrayIds[i].toString();
        if(i == auxArrrayIds.length - 1)
        {
            
        }
        else{
            auxSqlLine += ',';
        }
    }

    const getRoutinesWithIds = new Promise((resolve, reject) => {

        const sqlRegister = ` select * from rutinas where find_in_set(id_relacion_entrenador_usuario, '${auxSqlLine}');`;

        connection.query(sqlRegister, (error, resp) => {
            if(error)
            {   
                console.log(error.sqlMessage);
                reject(res.status(400).json({
                    ok: false,
                    message: 'error getting routine saved',
                    sqlMessage: error.sqlMessage
                }));
            }
            else{
                
                //console.log('res saving routine',resp);
                resolve(resp);

            }
        });
    });


    try {
        const routines = await getRoutinesWithIds;
        return res.json({
            message: 'get routines',
            routines
        });
    } catch (error) {
        console.log('error routines ids');
    }

}


module.exports = {
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
    getSavedRoutinesByTrainer,
    updateRoutineByTrainer,
}