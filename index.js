const express = require('express');
require('./config/config');

const fetch = require('node-fetch');
const admin = require("firebase-admin");

const fileUpload = require('express-fileupload');

require('dotenv').config();


const http = require('http');
const morgan = require('morgan');
const socketio = require('socket.io');


const mysql = require('mysql');
const connection = require('./database/database');
const cors = require('cors');
const path = require('path');


const bodyparser = require('body-parser');

const app = express();

app.use(cors());

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());


app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use(express.static(path.join(__dirname, 'public')));
console.log(__dirname);
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




app.post('/post', (req, res) => {
  
    let notification = {
        'title': 'title of modification',
        'text': 'subtitle'
    }

    let fcm_tokens = [];

    let notification_body = {
        'notification': notification,
        'registration_ids': fcm_tokens
    }

    fetch('https://fcm.googleapis.com/fcm/send', {
        'method': 'POST',
        'headers': {
            'Authorization': 'key='+'AAAANIM4o1I:APA91bEGTIkloYli3h_4nGjYKE1RMLClRhBYWRqpkFVoYsZTIzWe6Kg3iZEWZo-5fUyAqliK7dJ2ksdGycA8XNRpqEBshhJ80P0J6x5Gd6YUrx3p-oXcAIuy2qYf22Zc-AdREfn-fNdm',
            'Content-type':'aplication/json'
        },
        'body': JSON.stringify(notification_body)
    }).then(() => {
        console.log('succesfully');
    }).catch((error) => {
        console.log('error', error);
    });

    return res.json({
        message: 'qwe'
    });
});

function initFirebase() {
    const serviceAccount = require(__dirname + '/keys/roomgym-865ca-firebase-adminsdk-asm0d-640337b62c.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}


initFirebase();

app.post('/topic', (req, res) => {
    
    function sendPushToTopic(notification) {
        const message = {
            topic: notification.topic,
            /*
            android:{
                priority:"high"
              },
            apns:{
                headers:{
                  "apns-priority":"10"
                }
              },
              */
              
              notification:{
                body : "Notificación GymRoom",
                title : "Mensaje exitoso",
                //title: 'Aplicacion en segundo plano',
                //title: 'Aplicación cerrada'
              },
              
            data: {
                titulo: notification.titulo,
                mensaje: notification.mensaje
            }
        }
        sendMessage(message);
    }
    
    // https://firebase.google.com/docs/cloud-messaging/concept-options?hl=es    priority
    
    function sendMessage(message) {
        admin.messaging().send(message)
            .then((response) => {
                // Response is a message ID string.
                console.log('Successfully sent message:', response);
            })
            .catch((error) => {
                console.log('Error sending message:', error);
            })
    }

        // Here you could receive the topic id, titulo and mensage, in this case all these params are already hardcoded
    res.send("Sending Notification to a Topic...");
    const data = {
        topic: "juanortiz",
        titulo: "GymRoom",
        mensaje: "Mensaje de node.js"
    }
    
    sendPushToTopic(data);

});


app.get('/', (req, res) => {

    res.json({
        message: 'there are no users'
    });

});


app.use('/auth', require('./routes/authRoutes'));
app.use('/userscreens', require('./routes/userScreensRoutes'));
app.use('/relations', require('./routes/relationsRoutes'));
app.use('/files', require('./routes/filesRoutes'));

app.listen(process.env.PORT, () => {
    console.log(`Port running on port ${process.env.PORT}`);
});

/*
ngrok.connect(process.env.PORT).then((url) => {
    console.log(`Server forwarded to public url ${url}`);
  });
*/
// gymroom
// SKd8e0ddac3a54513bc7bb3c86819e1e47
// Standard
// S42edx1Iab3n7L8GVN0Q0MQIHunieZaw

// proyect
//3aece7c8