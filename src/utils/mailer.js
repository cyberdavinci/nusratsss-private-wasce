import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
const USER = process.env.USER;
const PASS = process.env.PASS;
const sendEmail = (emailTo, resetToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: USER,
      pass: PASS,
    },
  });
  const mailOptions = {
    from: "ebrimatouray3937@gmail.com<academiaportal.info>",
    to: emailTo,
    subject: "Password reset request, academiaportal.info",
    text: `Your password reset token is ${resetToken}`,
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
