const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();

const PORT = process.env.PORT;
const SENDER_MAIL = process.env.SENDER_MAIL;
const MAIL_PASS = process.env.MAIL_PASS;

const createTemplate = (verifyToken, email) => {
  const mailGen = new Mailgen({
    theme: 'default',
    product: {
      name: 'PhoneBook',
      link: `http://localhost:${PORT}`,
    },
  });

  const template = {
    body: {
      name: email,
      intro: "Welcome to PhoneBook! We're very excited to have you on board.",
      action: {
        instructions: 'To get started with PhoneBook, please click here:',
        button: {
          color: '#22BC66',
          text: 'Confirm your account',
          link: `https://localhost:${PORT}/api/users/verify/${verifyToken}`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  const emailBody = mailGen.generate(template);

  return emailBody;
};

const sendMail = async (verifyToken, email) => {
  const emailBody = createTemplate(verifyToken, email);

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: SENDER_MAIL,
      pass: MAIL_PASS,
    },
  });

  const options = {
    from: SENDER_MAIL,
    to: email,
    subject: 'Verification mail',
    html: emailBody,
  };
  try {
    await transporter.sendMail(options);
  } catch (error) {
    throw new Error(`Something went wrong: ${error.response}`);
  }
};

module.exports = {
  sendMail,
};

// Sending emails via SendGrid

// const sgMail = require('@sendgrid/mail');

// const createTemplate = (verifyToken, email) => {
//   const mailGen = new Mailgen({
//     theme: 'default',
//     product: {
//       name: 'PhoneBook',
//       link: 'http://localhost:3001',
//     },
//   });

//   const template = {
//     body: {
//       name: email,
//       intro: "Welcome to PhoneBook! We're very excited to have you on board.",
//       action: {
//         instructions: 'To get started with PhoneBook, please click here:',
//         button: {
//           color: '#22BC66',
//           text: 'Confirm your account',
//           link: `https://localhost:3001/api/users/verify/${verifyToken}`,
//         },
//       },
//       outro:
//         "Need help, or have questions? Just reply to this email, we'd love to help.",
//     },
//   };

//   const emailBody = mailGen.generate(template);

//   return emailBody;
// };

// const sendMail = async (verifyToken, email) => {
//   const emailBody = createTemplate(verifyToken, email);

//   sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//   const msg = {
//     to: email,
//     from: 'eozamyatina@gmail.com',
//     subject: 'Sending with SendGrid is Fun',
//     html: emailBody,
//   };

//   await sgMail.send(msg);
// };

// module.exports = {
//   sendMail,
// };
