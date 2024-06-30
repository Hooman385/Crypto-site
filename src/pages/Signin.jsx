import React, { useState } from "react";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { userAuth } from "../context/AuthContext";

const Signin = () => {
  const { signin } = userAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      await signin(email, password);
      console.log("you signed in successfuly");
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e);
    }
  };

  return (
    <div className="border border-secondary rounded-xl shadow-md min-w-[400px] w-[400px] mx-auto min-h-[600px] px-10 py-20">
      <h1 className="text-2xl font-bold ">Sign in</h1>
      <form onSubmit={handleSignin} className="my-5">
        <label>Email</label>
        <div className="relative w-full my-2 rounded-2xl shadow-xl">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-input p-2 w-full bg-primary border border-input rounded-2xl"
            type="email"
          />
          <AiOutlineMail className="absolute right-2 top-3 text-gray-400" />
        </div>
        <label>Password</label>
        <div className="relative w-full my-2 rounded-2xl shadow-xl">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-input p-2 w-full bg-primary border border-input rounded-2xl"
            type="password"
          />
          <AiOutlineLock className="absolute top-3 right-2" />
        </div>
        <button className="w-full bg-button  text-btnText font-bold rounded-2xl p-2 my-4">
          Sign in
        </button>
        <p className="my-4">
          Don't have an account?{" "}
          <Link className="cursor-pointer text-accent" to="/signup">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
