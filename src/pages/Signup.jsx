import React, { useState } from "react";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { userAuth } from "../context/AuthContext";
import { addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signup } = userAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signup(email, password);
      // setDoc(doc(db, "users", email), {
      //   watchList: [],
      // });
      console.log("you signed up successfuly");
      navigate("/");
    } catch (e) {
      setError(e.message);
      console.log(e);
    }
  };

  return (
    <div className="border border-secondary rounded-xl shadow-md min-w-[400px] w-[400px] mx-auto min-h-[600px] px-10 py-20">
      <h1 className="text-2xl font-bold ">Sign up</h1>
      {error ? <p className="bg-red-300 p-3 my-2">{error}</p> : null}
      <form onSubmit={handleSubmit} className="my-5">
        <label>Email</label>
        <div className="relative w-full my-2 rounded-2xl shadow-xl">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="bg-input p-2 w-full bg-primary border border-input rounded-2xl"
            type="email"
          />
          <AiOutlineMail className="absolute right-2 top-3 text-gray-400" />
        </div>
        <label>Password</label>
        <div className="relative w-full my-2 rounded-2xl shadow-xl">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="bg-input p-2 w-full bg-primary border border-input rounded-2xl"
            type="password"
          />
          <AiOutlineLock className="absolute top-3 right-2" />
        </div>
        <button className="w-full bg-button  text-btnText font-bold rounded-2xl p-2 my-4">
          Sign up
        </button>
        <p className="my-4">
          Already have an account?{" "}
          <Link className="cursor-pointer text-accent" to="/signin">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
