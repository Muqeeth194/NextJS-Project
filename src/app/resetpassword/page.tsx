"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [buttonDisabled, setButtonDisabled] = React.useState(true)
  const [token, setToken] = React.useState("")
  const [password, setPassword] = useState("")

  const doReset = async (event:any) => {
    event.preventDefault(); // Prevent default refresh behavior
    try {
      setLoading(true)
    //   console.log(password);
      
      const response = await axios.post("/api/users/login/resetpassword", {tokenFromEmail: token, newPassword: password})

      if(response.data.success){
        console.log("Password Reset: ", response.data.message);
        toast.success('Password Reset Successfull');
        router.push("/login")

      }else{
        console.log("User does not exist: ", response.data.message);
        toast.error(response.data.message)
      }

    } catch (error: any) {
      toast.error(error.message)
    } finally{
      setLoading(false)
    }

  };

  useEffect(()=>{
    if (
        password.length > 0 
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [password])

  useEffect(()=>{
    const tokenFromUrl = window.location.search.split("=")[1]
    setToken(tokenFromUrl)
  }, [])

  return (
    <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="text-3xl mb-6">{loading ? "Processing" : "Reset password" }</h1>
      <form className="w-full max-w-sm">

        <div className="mb-6">
          <label htmlFor="email" className="block text-white">
            Enter the new password:
          </label>
          <input
            id="password"
            className="form-input mt-1 block w-full rounded-md border-gray-300 text-black"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-6 rounded focus:outline-none focus:shadow-outline"
          onClick={doReset}
        >
          {buttonDisabled ? "No Reset" : "Reset" }
        </button>

      </form>
    </div>
  );
};

export default ResetPassword;
