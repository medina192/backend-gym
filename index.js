const express = require('express');
require('./config/config');
const mysql = require('mysql');
const connection = require('./database/database');
const cors = require('cors');

const bodyparser = require('body-parser');

const app = express();

app.use(cors());

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.get('/getusers', (req, res) => {

    const sql = `SELECT * from usuario`;

    connection.query(sql, (error, users) => {
        if(error)
        {
            console.log('get users',error);
            res.status(400).json({
                ok: false,
                message: 'error get users'
            });
        }
        else{
            if(users.length > 0){
                res.json({
                    users
                });
            }
            else{
                res.json({
                    message: 'there are no users'
                });
            }
        }
    })
});

app.use('/auth', require('./routes/authRoutes'));
app.use('/userscreens', require('./routes/userScreensRoutes'));
app.use('/relations', require('./routes/relationsRoutes'));

app.listen(process.env.PORT, () => {
    console.log(`Port running on port ${process.env.PORT}`);
});