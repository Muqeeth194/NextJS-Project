"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
import toast from "react-hot-toast";
import { set } from "mongoose";

const Login = () => {
  const [loading, setLoading] = React.useState(false)
  const [buttonDisabled, setButtonDisabled] = React.useState(true)
  const [user, setUser] = React.useState({
    email: "",
    password: "",

  });

  const onLogin = async (event:any) => {
    event.preventDefault(); // Prevent default refresh behavior
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login", user)

      if(response.data.success){
        console.log("user logged in: ", response.data.message);
        toast.success('User logged in');
      }else{
        console.log("Invalid Details: ", response.data.message);
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
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-3xl mb-6">{loading ? "Processing" : "Log In" }</h1>
      <form className="w-full max-w-sm">

        <div className="mb-6">
          <label htmlFor="email" className="block text-white">
            Email
          </label>
          <input
            id="email"
            className="form-input mt-1 block w-full rounded-md border-gray-300 text-black"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-white">
            Password
          </label>
          <input
            id="password"
            className="form-input mt-1 block w-full rounded-md border-gray-300 text-black"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={onLogin}
        >
          {buttonDisabled ? "No Login" : "Login" }
        </button>

        <Link href="/signup" className="px-8">
          Visit SignUp Page
        </Link>
      </form>
    </div>
  );
};

export default Login;
