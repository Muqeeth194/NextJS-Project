"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
import toast from "react-hot-toast";


const ForgotPassword = () => {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [buttonDisabled, setButtonDisabled] = React.useState(true)
  const [email, setEmail] = React.useState("")

  const onSubmit = async (event:any) => {
    event.preventDefault(); // Prevent default refresh behavior
    try {
      setLoading(true)
      console.log(email);
      
      const response = await axios.post("/api/users/login/forgotpassword", {emailFromUser: email})

      if(response.data.success){
        console.log("Email sent: ", response.data.message);
        toast.success('Email sent');
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
      email.length > 0 
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email])

  return (
    <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="text-3xl mb-6">{loading ? "Processing" : "Forgot password" }</h1>
      <form className="w-full max-w-sm">

        <div className="mb-6">
          <label htmlFor="email" className="block text-white">
            Email
          </label>
          <input
            id="email"
            className="form-input mt-1 block w-full rounded-md border-gray-300 text-black"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-6 rounded focus:outline-none focus:shadow-outline"
          onClick={onSubmit}
        >
          {buttonDisabled ? "No Submit" : "Submit" }
        </button>

        <Link href="/login" className="px-8">
          Visit Login Page
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
