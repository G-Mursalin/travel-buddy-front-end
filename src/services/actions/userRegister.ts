import { FieldValues } from "react-hook-form";
import setAccessTokenToCookie from "./setAccessTokenToCookie";

export const userRegister = async (data: FieldValues) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // credentials: "include",
    }
  );
  const userInfo = await res.json();

  if (userInfo.data.accessToken) {
    setAccessTokenToCookie(userInfo.data.accessToken, {
      redirect: "/",
    });
  }

  return userInfo;
};
