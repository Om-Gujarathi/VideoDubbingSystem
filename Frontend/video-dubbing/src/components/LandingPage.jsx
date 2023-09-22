import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import heroStartImg from "../assests/heroStart.png";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/main");
  };

  return (
    <div className="bg-violet-600">
      <Navbar />
      <div>
        <h1 className="landingHeading  m-2"> DUB YOUR VIDEOS </h1>
      </div>
      <div
        className="text-center text-white text-[28px] font-bold font-['Inter']
       leading-[42px] mb-2"
      >
        Unlock Voices, Amplify Stories: Your Trusted Video Dubbing Hub.
      </div>
      <div className="justify-end items-center m-6 overflow-hidden ">
        <div className=" flex justify-center">
        <button onClick={handleGetStarted} className="text-center rounded-xl w-80 h-14 bg-zinc-800 shadow-inner text-white font-bold font-sans  ">
          Get started
        </button>
        </div>
        <div className="flex justify-center">
        <img className="w-[700px] h-[420px] m-4" src={heroStartImg} />
        </div>
        

      
      </div>
    </div>
  );
};

export default LandingPage;
