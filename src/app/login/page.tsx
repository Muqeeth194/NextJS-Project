"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { Axios } from "axios";

const Login = () => {
  const [user, setUser] = React.useState({
    email: "",
    password: "",

  });

  const onLogin = () => {};

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-3xl mb-6">Login</h1>
      <form className="w-full max-w-sm">

        <div className="mb-6">
          <label htmlFor="email" className="block text-white">
            Email
          </label>
          <input
            id="email"
            className="form-input mt-1 block w-full rounded-md border-gray-300"
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
            className="form-input mt-1 block w-full rounded-md border-gray-300"
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
          Login
        </button>

        <Link href="/signup" className="px-8">
          Visit SignUp Page
        </Link>
      </form>
    </div>
  );
};

export default Login;
