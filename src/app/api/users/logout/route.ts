import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = NextResponse.json({
      message: "Token has been removed",
      success: true,
    });

    // setting the token as empty in the cookies
    response.cookies.set("token", "", 
    {
        httpOnly: true
    })

    // Sending the response back
    return response

  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
};
