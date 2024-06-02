import { FieldValues } from "react-hook-form";
import setAccessTokenToCookie from "./setAccessTokenToCookie";

export const userRegister = async (data: FieldValues) => {
  const res = await fetch(`http://localhost:5000/api/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    // credentials: "include",
  });
  const userInfo = await res.json();

  if (userInfo.data.accessToken) {
    setAccessTokenToCookie(userInfo.data.accessToken, {
      redirect: "/dashboard",
    });
  }

  return userInfo;
};
