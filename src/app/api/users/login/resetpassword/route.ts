import { connect } from "@/dbConfig/dbConfig";
import { User as DBModelUser } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

connect()

export const POST = async(request: NextRequest)=> {
    try {
        const {tokenFromEmail, newPassword} = await request.json()

        const user = await DBModelUser.findOne({forgotPasswordToken: tokenFromEmail, forgotPasswordTokenExpiry: {$gt: Date.now()}})

        if(!user){
            return NextResponse.json(
                {message: "Invalid Token from the email"}
            )
        }

        console.log(newPassword);

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);
        
        user.password = hashedPassword
        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined

        console.log(user.email);

        await user.save()

        return NextResponse.json(
            {
                message: "Password reset is completed",
                success: true
            }
        )
        
    } catch (error:any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}