import mongoose from "mongoose";
import { User as DBModelUser } from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await DBModelUser.findOne({ email });

    // check if the user exists
    if (!user) {
      return NextResponse.json({ message: "User does not exist", success: false});
    }

    // Check if the user's email address is verified or not.

    if(!user.isVerifeid){
      return NextResponse.json({ message: "Email is not verified", success: false });
    }

    // Check if the entered password is valid or not
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "Password is invalid" });
    }



    // create a token data
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    // create Token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "User logged in",
      success: true,
    });

    // access the user cookies using nextResponse to store the token
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    // send the response back. It will send the message and set the cookies as well
    return response;
    
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
