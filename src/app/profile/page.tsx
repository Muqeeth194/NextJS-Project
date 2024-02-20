"use client"
import React, {useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NextNProgress from 'nextjs-progressbar';
import { useDispatch } from "react-redux";
import { changeState } from "@/lib/navbar/navbarSlice";

const Profile = () => {
  const router = useRouter()
  const [userData, setUserData] = React.useState("Nothing")
  const dispatch = useDispatch()

  const getUserDetails = async() => {
    try {
      const response = await axios.get('/api/users/user')
      if(response.data.success){
        console.log(response.data );
        setUserData(response.data.userFromDB.username)
      }
    } catch (error) {
      
    }
  }

  // const logout = async() => {
  //   try {
  //     const response = await axios.get("api/users/logout")

  //     console.log(response.data);
      
  //     if(response.data.success){
  //       toast.success("Logged out successfully")
  //       router.push('/login')
  //     }
      
  //   } catch (error:any) {
  //     toast.error(error.message)
  //   }
  // }

  useEffect(()=>{
    dispatch(changeState("private"))
  }, [])


  return (
    <>
    <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="text-3xl  mb-6">Profile</h1>
      <p className="text-2xl  mb-6">Profile Section</p>

      <p className="text-2xl  mb-6 p-1 rounded bg-green-500 hover:bg-green-700">{userData === "Nothing" ? "Nothing" : <Link href={`/profile/${userData}`}> {userData}</Link>}</p>


      <hr />
      {/* <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={logout}>
        LogOut
      </button> */}

      <button 
        className="bg-green-500 hover:bg-green-700 mt-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={getUserDetails}>
        Get Details
      </button>

    </div>
    </>
  );
};

export default Profile;
