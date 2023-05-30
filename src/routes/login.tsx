import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { sanitizeInput } from "../utils";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || "/";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = sanitizeInput(formData.get("username") as string);
    const password = sanitizeInput(formData.get("password") as string);

    auth.signin(username, password, () => {
      navigate(from, { replace: true });
    });
  }

  return (
    <div className="w-screen min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="text-left" htmlFor="username">
          Username
        </label>
        <input
          className="focus-visible:outline-none p-2 rounded-md bg-stone-700"
          id="username"
          name="username"
          defaultValue="eve.holt@reqres.in"
          type="text"
        />
        <label className="text-left" htmlFor="password">
          Password
        </label>
        <input
          className="focus-visible:outline-none p-2 rounded-md bg-stone-700"
          type="password"
          name="password"
          defaultValue="cityslicka"
        />
        <button
          className="px-4 w-min py-2 bg-blue-700 hover:bg-blue-600 rounded-md"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
