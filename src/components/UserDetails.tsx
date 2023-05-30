import React from "react";

const UserDetails = () => {
  return (
    <div className="flex w-full space-x-4">
      <div className="w-10 h-10 rounded-full flex justify-center items-center bg-green-400">
        <span>T</span>
      </div>
      <div>
        <h1 className="text-2xl">Talmeez Ahmed</h1>
        <p className="text-base">talmeezahmed786@gmail.com</p>
      </div>
    </div>
  );
};

export default UserDetails;
