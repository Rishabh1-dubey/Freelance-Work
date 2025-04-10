import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");




  const handleClick=(e)=>{
    e.preventDefault()
    console.log("User registerd",{email,password})
    }

  return (
    <div className="flex ">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form onSubmit={handleClick} className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">Shopeasy</h2>
          </div>

          <h2 className="text-2xl font-bold text-center mb-6">Hey there! 🙋🏻</h2>
          <p className="text-center mb-6">
            Enter your username and password to login
          </p>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Enter your email addresss"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              placeholder="Enter your Password"
            />
          </div>
          <button className="bg-black w-full text-white rounded py-2 px-2 font-semibold hover:bg-gray-900 cursor-pointer transition ">
            SignIN
          </button>
          <p className="mt-6 text-center text-sm">
            Don't have an Account? {""}
            <Link
              to="/register"
              className="text-black underline hover:text-blue-500"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
      {/* Right side */}

      
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center  items-center">
          <img
            src="https://ncetir.com/Images/login@4x.png"
            alt="Login to account"
            className=" object-cover w-full "
          />
        </div>
      </div> 
      
    </div>
  );
};

export default Login;
