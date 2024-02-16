import { User as DbUserModel } from "@/models/userModel" 
import bcryptjs from "bcryptjs"
import nodemailer from "nodemailer"

/*
1. When the user tries to Signup, the userId of the user needs to hashed.
2. One copy of the hashed value will be stored in the DB.
3. Send one copy of the hashed value to the user's email address using nodemailer.
*/

export const sendEmail = async({email, emailType, userId}: any) => {
    try {
        
        // mongoDb ID could be bson also so changing it to String
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        // Storing the hash value in the database based on the email type
        if (emailType === "VERIFY"){
            await DbUserModel.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000}) //expiration is set to 1 hour
        } else if (emailType === "RESET"){
            await DbUserModel.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        // Sending the hash value over to the email provided by the user

        // contains the necessary SMTP server details
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "1fa673726cfb8f",
              pass: "d3a4d4ad8f30c5"
            }
          });

        // Design the email and provide the email options
        const mailOptions = {
            from: "muqeeth@gmail.com",
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
            html: 
                `<p> 
                    Click <a href="${process.env.DOMAIN}/${emailType === "VEIRFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email": "reset your password"}
                    or copy and paste the following link in the browser. <br><br> ${process.env.DOMAIN}/${emailType === "VEIRFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}
                </p>`
        }

        // set up the options and configuration
        const mailResponse = await transport.sendMail(mailOptions)

        // Fire the email
        return mailResponse

    } catch (error: any) {
        throw new Error(error.message)
    }
}