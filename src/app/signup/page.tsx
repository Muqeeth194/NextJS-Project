"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { Axios } from "axios";

const Signup = () => {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignup = () => {};

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-3xl mb-6">Signup</h1>
      <form className="w-full max-w-sm">
        <div className="mb-6">
          <label htmlFor="username" className="block text-white">
            Username
          </label>
          <input
            id="username"
            className="form-input mt-1 block w-full rounded-md border-gray-300"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Username"
          />
        </div>

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
          onClick={onSignup}
        >
          Sign Up
        </button>

        <Link href="/login" className="px-8">
          Visit Login Page
        </Link>
      </form>
    </div>
  );
};

export default Signup;
