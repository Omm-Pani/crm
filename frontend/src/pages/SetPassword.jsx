import React, { useState } from "react";
import AuthInputBox from "../ui/AuthInputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

export default function SetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  console.log(postInputs);
  const sendRequest = async () => {
    if (postInputs.password !== postInputs.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const { data } = await axios.post(
      "http://localhost:5000/set-password",
      postInputs
    );

    const { message, ...rest } = data;
    setTimeout(() => {
      dispatch({ type: "LOGIN", payload: rest });
      Cookies.set("user", JSON.stringify(rest));
      navigate("/");
    }, 2000);
    console.log(message);
    navigate("/");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <AuthInputBox
          label="Email"
          placeholder="Email"
          onChange={(e) => {
            setPostInputs({
              ...postInputs,
              email: e.target.value,
            });
          }}
        />

        <AuthInputBox
          label="Password"
          placeholder="Password"
          onChange={(e) => {
            setPostInputs({
              ...postInputs,
              password: e.target.value,
            });
          }}
        />
        <AuthInputBox
          label="Confirm Password"
          placeholder="Confirm Password"
          onChange={(e) => {
            setPostInputs({
              ...postInputs,
              confirmPassword: e.target.value,
            });
          }}
        />

        <button
          type="button"
          onClick={sendRequest}
          className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Sign up complete
        </button>
      </div>
    </div>
  );
}
