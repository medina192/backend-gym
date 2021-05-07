const mysql = require('mysql');


const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Labinco_123',
    database : 'GymTrainer'
});

connection.connect((error) => {
    if(error){
        console.log(error);
        throw error;
    } 
    console.log('database connected');
});

module.exports = connection;
