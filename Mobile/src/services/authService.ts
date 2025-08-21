import axios from "axios";
import { ISignInForm, ISignUpForm } from "../interfaces";
const globalApi = "http://192.168.20.144:3000";

export const signUpService = async (userData: ISignUpForm) => {
  try {
    const response = await axios.post(
      `${globalApi}/api/auth/register`,
      userData
    );
    console.log("success service: ", userData);
    console.log("success service: ", response);

    return response.data;
  } catch (err) {
    console.log("Error at signup service with userData: ", userData);
    throw err;
  }
};

// services/authService.ts
export const signInService = async (userData: ISignInForm) => {
  try {
    const response = await axios.post(`${globalApi}/api/auth/login`, userData);
    // console.log("sign in user service called with: ", "userData");
    // console.log("Response Data: ", response.data);
    return response.data; // Should return user data
  } catch (error) {
    console.log("sign in user service error!: ", "userData");
    throw error; // Important to throw so thunk catches it
  }
};

// export const signInService = async (userData: ISignInForm) => {
//   const response = axios
//     .post("http://192.168.20.144:3000/api/auth/login", userData)
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log("failed yeah...", error);
//     });

//   return response;
// };

// let's try with fetch... cuz why not?

// export const signInService = async (userData: ISignInForm) => {
//   try {
//     const response = await fetch("http://192.168.20.144:3000/api/auth/login", {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       method: "POST",
//       body: JSON.stringify(userData),
//     });

//     console.log("No Error Mate: ", response);
//     return response;
//   } catch (err) {
//     console.log("Error Mate: ", err, "User Data Mate: ", userData);
//     throw err;
//   }
// };
