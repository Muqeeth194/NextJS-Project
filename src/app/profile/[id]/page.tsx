import React from "react";

const UserProfile = ({ params }: any) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-3xl  mb-6">Profile</h1>
      <p className="text-2xl  mb-6">Profile Section
        <span className="text-2xl px-2 ml-2 bg-yellow-500 rounded text-black">{params.id}</span>
      </p>
    </div>
  );
};

export default UserProfile;
