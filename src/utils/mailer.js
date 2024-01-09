import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
const USERMAIL = process.env.USERMAIL;
const PASS = process.env.PASS;
const sendEmail = (emailTo, resetToken) => {
  // console.log(USERMAIL, PASS);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: USERMAIL,
      pass: PASS,
    },
  });
  const mailOptions = {
    from: "ebrimatouray3937@gmail.com<academiaportal.vercel.app>",
    to: emailTo,
    subject: "Password reset request, academiaportal.vercel.app",
    text: `Your password reset pin is ${resetToken}`,
  };

  //
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return new NextResponse("error sending mail", {
        status: 500,
        error: error,
      });
    } else {
      console.log(`Email sent. ${info.response}`);
      return new NextResponse("email sent", { status: 200 });
    }
  });
};
export default sendEmail;
