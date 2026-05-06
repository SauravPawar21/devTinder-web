import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("elon2@musk.com");
  const [password, setPassword] = useState("Musk@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }, // it will sent the token back
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card card-dash bg-base-200 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-semibold text-white">
            Login
          </h2>

          <div className="px-3 my-4">
            <label className="label py-1">
              <span className="label-text text-white">Email Id</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          <div className="px-3 my-4">
            <label className="label py-1">
              <span className="label-text text-white">Password</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center py-4">
            <button
              className="btn w-24 bg-purple-600 hover:bg-purple-700 text-white border-none"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
