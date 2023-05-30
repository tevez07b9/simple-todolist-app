import React from "react";
import { useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between w-full px-4 py-6">
      <div className="">
        <UserDetails />
      </div>
      <div className="">
        <button
          className="px-4 w-min py-2 bg-blue-700 hover:bg-blue-600 rounded-md"
          type="submit"
          onClick={() => {
            auth.signout(() => navigate("/login"));
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
