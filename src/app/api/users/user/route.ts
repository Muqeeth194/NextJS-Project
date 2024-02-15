import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { User as DbUserModel } from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { useImperativeHandle } from "react";

connect();

export const GET = async (request: NextRequest) => {
  try {
    const userId = await getDataFromToken(request);
    

    // selects the entire object and deselects the password
    const userFromDB = await DbUserModel.findOne({ _id: userId }).select("-password");

    console.log(userFromDB);

    return NextResponse.json({
      message: "User found",
      success: true,
      userFromDB,
    });

  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500})
  }
};
