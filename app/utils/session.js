
export const getToken = (state) => state.otpReducer?.loginData?.data?.jwtToken;
export const getLoginReducer = (state) => state.loginReducer?.loginData?.data

// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";

// const loginReducer = useSelector(state => get(state, 'loginReducer', ''));

// export const getAccessToken = () => {
//     try {
//         if (loginReducer.loginData?.data?.jwtToken != undefined) {
//             return loginReducer.loginData?.data?.jwtToken;
//         }
//     } catch (e) {
//         console.log(e, '--No active sesion');
//     }
// }