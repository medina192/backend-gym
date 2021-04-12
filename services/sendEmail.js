
const nodemailer = require("nodemailer");
    
     const transporter = nodemailer.createTransport({
        host: "smtp.gmail.email",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "diaz.medina.cb84@gmail.com", // generated ethereal user
          pass: 'mdylhgmtnfnpqfif', // generated ethereal password
        },
      });
      /*
      transporter.verify().then( () => {
          console.log('email ready');
      }).catch((error) => {
          console.log('error', error);
      })
*/
      module.exports = {
          transporter
      }