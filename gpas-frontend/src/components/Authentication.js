import React from "react";
import { useState } from "react";

const Authentication = () => {
  const [register, setRegister] = useState(true);
  return (
    <div className="flex bg-gray-700 w-full h-screen">
      <div className="bg-slate-600 w-3/5 h-80 m-auto text-white">
        <div className="flex justify-around">
          <div
            onClick={() => setRegister(true)}
            className={`display:block p-2 align-middle w-1/2 cursor-pointer font-bold transition ease-in-out delay-100   ${
              register ? " bg-green-400" : "bg-slate-400"
            }`}
          >
            Signup
          </div>
          <div
            onClick={() => setRegister(false)}
            className={`display:block p-2 w-1/2 align-middle cursor-pointer font-bold ${
              register ? " bg-slate-400" : "bg-green-400"
            }`}
          >
            Login
          </div>
        </div>

        <div>
          <form className="flex flex-col ">
            <div className="flex flex-col items-center">
              <label className="text-bold mt-10 text-2xl">
                {register ? "Set your Username" : "Enter your Username"}
              </label>
              <input
                className="border-2 border-gray-300 p-2 rounded-lg hover:border-gray-400 focus:outline-none focus:border-gray-400 mt-5 w-4/5 text-black"
                type="text"
                name="username"
                id="username"
                placeholder="Enter Here"
              />
            </div>
          </form>
          <button
            type="submit"
            className="mt-16 px-5 py-1 rounded-md bg-gray-400"
          >
            {register ? "Get Started" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
