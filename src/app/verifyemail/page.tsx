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
      const response = await axios.post('api/users/verifyemail', {tokenFromEmail: token});
      if (response.data.success) {
        toast.success(response.data.message);
        setVerified(true);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleVerify = () => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  };

  useEffect(() => {
    // window.location.search will give the url after '?' . So split them based on '=' and access the 2nd section which is actually the token
    const tokenFromUrl = window.location.search.split("=")[1];
    setToken(tokenFromUrl || "");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-3xl mb-6"> Email Verification Page </h1>

      {verified ? (
        <div>
          <p className="text-2xl  mb-6">Email Verified</p>
          <Link href="/login">Login</Link>
        </div>
      ) : (
        <button
          className="bg-orange-500 hover:bg-orange-700 mt-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleVerify}
        >
          Verify Your Email
        </button>
      )}
    </div>
  );
};

export default VerifyEmail;