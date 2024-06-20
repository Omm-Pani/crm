const AWS = require("aws-sdk");
require("dotenv").config();

const SES_Config = {
  accessKeyId: process.env.SES_ACCESS_KEY,
  secretAccessKey: process.env.SES_ACCESS_KEY_SECRET,
  region: "ap-south-1",
};

const AWS_SES = new AWS.SES(SES_Config);

const sendEmail = async (email) => {
  const params = {
    Source: process.env.SES_SENDER,
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: "<h1>this is test email</h1>",
        },
        Text: {
          Charset: "UTF-8",
          Data: "this is test email",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Verify Your Email",
      },
    },
  };

  try {
    const data = await AWS_SES.sendEmail(params).promise();
    console.log("email sent", data);
  } catch (err) {
    console.log(err);
  }
};
sendEmail("ommpani9@gmail.com");
