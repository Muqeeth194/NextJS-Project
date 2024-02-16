import { connect } from "@/dbConfig/dbConfig";
import { User as DBModelUser } from "@/models/userModel";
import { request } from "http";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";


connect()

export const POST = async(request: NextRequest) => {
    try {
        const { emailFromUser } = await request.json()
    
        const userFromDB = await DBModelUser.findOne({email: emailFromUser}).select("-password")
        console.log(userFromDB);
    
        if(!userFromDB){
            return NextResponse.json(
                { error: "User does not exists" },
                { status: 400 }
              );
        }
        
        // Using the helper to generate the token. Send one to email and another one to database.
        await sendEmail({email: emailFromUser, emailType: "RESET", userId: userFromDB._id})
    
        return NextResponse.json({
            message: "Email sent Successfully",
            success: true
          });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}