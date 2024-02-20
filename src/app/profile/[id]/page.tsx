"use client"

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeState } from "@/lib/navbar/navbarSlice";

const UserProfile = ({ params }: any) => {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(changeState("private"))
  }, [])

  return (
    <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="text-3xl  mb-6">Profile</h1>
      <p className="text-2xl  mb-6">Profile Section
        <span className="text-2xl px-2 ml-2 bg-yellow-500 rounded text-black">{params.id}</span>
      </p>
    </div>
  );
};

export default UserProfile;
