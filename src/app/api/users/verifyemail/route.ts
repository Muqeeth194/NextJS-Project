import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { User as DBModelUser } from "@/models/userModel";


connect()

export const POST = async(request: NextRequest) => {
    try {
        const { tokenFromEmail } = await request.json()

        // console.log(tokenFromEmail);
        

        // get the user based on the token and whose expiration date is greater than the current date
        const user = await DBModelUser.findOne(
            {
                verifyToken: tokenFromEmail, 
                verifyTokenExpiry: {$gt: Date.now()}
            }
        )

        if(!user){
            return NextResponse.json(
                {
                    message: "Invalid Token from the email",
                    success: false
                }
            )
        }

        // Update the user extracted from the database as verified and upload the updated copy to database.
        user.isVerifeid = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        console.log(user);

        await user.save()

        return NextResponse.json(
            {
                message: "User is verified",
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