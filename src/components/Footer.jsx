import React from "react";
import ThemeToggle from "./ThemeToggle";
import { AiOutlineTwitter, AiOutlineGithub } from "react-icons/ai";
import { MdOutlineFacebook } from "react-icons/md";
import { BsReddit } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="rounded-div flex flex-col max-h-fit min-w-[400px] ">
      <div className="grid grid-cols-1 md:grid-cols-2 px-2 py-4 ">
        {/* left or first col starts  */}
        <div className="flex gap-10 justify-around md:justify-start ">
          <div>
            <h4 className="font-bold mb-2">Support</h4>
            <ul className="flex flex-col gap-1">
              <li className="text-sm">HELP CENTER</li>
              <li className="text-sm">CONTACT US</li>
              <li className="text-sm">API STATUS</li>
              <li className="text-sm">DOCUMENTATION</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">INFO</h4>
            <ul className="flex flex-col gap-1">
              <li className="text-sm">ABOUT US</li>
              <li className="text-sm">CAREERS</li>
              <li className="text-sm">INVEST</li>
              <li className="text-sm">LEGAL</li>
            </ul>
          </div>
        </div>
        {/* right or second col starts */}
        <div className="flex flex-col gap-2 md:items-end w-full items-center mt-10 md:mt-0">
          <ThemeToggle />
          <span>Sign up for crypto news</span>
          <form>
            <input
              className="bg-primary border border-input p-2 mr-2 w-full shadow-xl rounded-2xl md:w-auto"
              type="text"
              placeholder="Enter your email"
            />
            <button className="bg-button font-bold text-btnText px-4 p-2 w-full md:w-auto rounded-2xl shadow-xl hover:shadow-2xl my-2">
              Sign up
            </button>
          </form>
          <div className="flex  md:gap-20 justify-evenly md:justify-end w-full text-accent py-4">
            <AiOutlineTwitter className="text-2xl cursor-pointer hover:scale-150 duration-300 ease-in-out" />
            <MdOutlineFacebook className="text-2xl cursor-pointer hover:scale-150 duration-300 ease-in-out" />
            <BsReddit className="text-2xl cursor-pointer hover:scale-150 duration-300 ease-in-out" />
            <AiOutlineGithub className="text-2xl cursor-pointer hover:scale-150 duration-300 ease-in-out" />
          </div>
        </div>
      </div>
      <span className="text-center w-full py-4">Powered by Coin Gecko</span>
    </div>
  );
};

export default Footer;
