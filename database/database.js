const mysql = require('mysql');

/*
const connection = mysql.createConnection({
    host     : 'sql396.main-hosting.eu',
    user     : 'u743223069_alejandro',
    password : 'Password_1',
    database : 'u743223069_roomgym'
});

connection.connect((error) => {

    try {
        if(error){
 
            throw error;
        } 
        else
        {
            console.log('database connected');
        }
    } catch (error) {
        console.log(error);
    }

});
*/
/*
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
*/

const connection = mysql.createConnection({
    host     : 'sql3.freemysqlhosting.net',
    user     : 'sql3418581',
    password : 'CITCQCUiUp',
    database : 'sql3418581'
});

connection.connect((error) => {
    if(error){
        console.log(error);
        throw error;
    } 
    console.log('database connected');
});

module.exports = connection;
