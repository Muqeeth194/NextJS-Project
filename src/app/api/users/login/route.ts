import mongoose from "mongoose";
import { User as DBModelUser } from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody

        console.log(reqBody);
        

      
        const user = await DBModelUser.findOne({ email });
      
        if (!user) {
          return NextResponse.json({ message: "User does not exist" });
        }
      
        const isValidUser = await bcryptjs.compare(password, user.password);
      
        if (!isValidUser) {
          return NextResponse.json({ message: "Details are invalid" });
        }
      
        return NextResponse.json({
          message: "User Logged in Successfully",
          success: true,
        });
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
};
