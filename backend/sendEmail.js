const nodemailer = require("nodemailer");
require("dotenv").config();

exports.sendEmail = (toEmail) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_SENDER_PASSWORD,
    },
  });

  const mail_options = {
    from: {
      name: "TEST",
      address: process.env.EMAIL_SENDER,
    },
    to: toEmail,
    subject: "Sending Email using Nodemailer",
    text: "That was easy!",
    html: "<h1>Bellow is the link to set your password</h1> <a href='http://localhost:5173/set-password'>Click here</a>",
  };

  try {
    transporter.sendMail(mail_options);
    console.log("email sent");
  } catch (error) {
    console.log(error);
  }
};
// sendEmail(transporter, mail_options);
