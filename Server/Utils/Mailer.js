// Mailer Utility: Sends emails. Because even books need to send mail sometimes.
const nodemailer = require("nodemailer");

const sendLoginDetails = async (to, subject, text) => {
  try { 
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:
            {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_PASS, // Your email password or app password
            },

    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log(error, "Email not sent");
  }
};

module.exports = sendLoginDetails;