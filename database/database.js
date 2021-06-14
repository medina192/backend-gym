const mysql = require('mysql');

var pool = mysql.createPool({
    host     : '5.181.218.1',
    user     : 'u743223069_gymroom',
    password : 'Gymroom_1',
    database : 'u743223069_gymroom'
});

/*
pool.getConnection(function (error, conn) {
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
var selectSQL = `Insert into proof(nombres) values('alejandro')`;

pool.getConnection(function (error, conn) {
    try {
        if(error){
 
            throw error;
        } 
        else
        {
            console.log('database connected');
            conn.query(selectSQL,function(err,rows){
                if (err) console.log(err);
                console.log("SELECT ==> ");
                for (var i in rows) {
                    console.log(rows[i]);
                }
                conn.release();
            });
        }
    } catch (error) {
        console.log(error);
    }


});
/*
const connection = mysql.createConnection({
    host     : '5.181.218.1',
    user     : 'u743223069_gymroom',
    password : 'Gymroom_1',
    database : 'u743223069_gymroom'
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
/*
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
*/
module.exports = pool;
