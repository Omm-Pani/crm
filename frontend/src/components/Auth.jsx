import React from "react";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthInputBox from "../ui/AuthInputBox";
// import { SignupType } from "@omm_pani/blog-common";
// import z from "zod";

// const SignupInput = z.object({
//   email: z.string().email(),
//   password: z.string(),
//   name: z.string().optional(),
// });

export const Auth = ({ type }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState({
    email: "",
    mobile_number: "",
    password: "",
    username: "",
    company_name: "",
  });
  const [adminPass, setAdminPass] = useState("");
  console.log(postInputs);
  async function sendSignInRequest() {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/signin",
        postInputs
      );
      const { message, ...rest } = data;

      dispatch({ type: "LOGIN", payload: rest });
      Cookies.set("user", JSON.stringify(rest));
      navigate("/");
    } catch (error) {
      console.error("error while signing in");
    }
  }

  async function sendSignupRequest() {
    try {
      if (adminPass === "admin") {
        const response = await axios.post(
          "http://localhost:5000/signup",
          postInputs
        );
        const jwt = response.data;
        console.log(jwt);
      }
    } catch (error) {
      console.error("error while signing up");
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-1/2">
        <div className="text-3xl font-bold text-center">Create an account</div>

        {type === "signup" ? (
          <AuthInputBox
            label="Username"
            placeholder="username"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                username: e.target.value,
              });
            }}
          />
        ) : null}
        {type === "signup" ? (
          <AuthInputBox
            label="company name"
            placeholder="company name"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                company_name: e.target.value,
              });
            }}
          />
        ) : null}
        {type === "signup" ? (
          <AuthInputBox
            label="Phone number"
            placeholder="Phone number"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                mobile_number: e.target.value,
              });
            }}
          />
        ) : null}
        <AuthInputBox
          label="Email"
          placeholder="email@email.com"
          onChange={(e) => {
            setPostInputs({
              ...postInputs,
              email: e.target.value,
            });
          }}
        />
        {type === "signup" ? (
          <AuthInputBox
            label="Admin Password"
            placeholder="AdminPassword"
            onChange={(e) => {
              setAdminPass(e.target.value);
            }}
          />
        ) : null}

        {type === "signin" ? (
          <AuthInputBox
            label="Password"
            placeholder="Password"
            type="password"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                password: e.target.value,
              });
            }}
          />
        ) : null}

        {type === "signup" && (
          <button
            type="button"
            onClick={sendSignupRequest}
            className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Sign up
          </button>
        )}

        {type === "signin" && (
          <button
            type="button"
            onClick={sendSignInRequest}
            className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};
