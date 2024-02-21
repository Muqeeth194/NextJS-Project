"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);

  const verifyUserEmail = async () => {
    try {
      if (token.length > 0) {
        const response = await axios.post("api/users/verifyemail", {
          tokenFromEmail: token,
        });

        console.log(response.data);
        
        if (response.data.success) {
          toast.success(response.data.message);
          setVerified(true);

        }else{
          toast.error(response.data.message);
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // window.location.search will give the url after '?' . So split them based on '=' and access the 2nd section which is actually the token
    const tokenFromUrl = window.location.search.split("=")[1];
    setToken(tokenFromUrl || "");
  }, []);

  return (
    <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="text-3xl mb-6"> Email Verification Page </h1>

      {verified ? (
        <div>
          {/* <h1 className="text-2xl  mb-6">Email Verified</h1> */}
            <p>Email is verified. Please navigate to Login page</p>
        </div>
      ) : (
        <button
          className="bg-orange-500 hover:bg-orange-700 mt-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={verifyUserEmail}
        >
          Verify Your Email
        </button>
      )}
    </div>
  );
};

export default VerifyEmail;
