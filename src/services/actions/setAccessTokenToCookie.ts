"use server";
import { authKey } from "@/constants/authKey";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const setAccessTokenToCookie = (
  token: string,
  option?: { redirect: string }
) => {
  cookies().set(authKey, token);

  if (option && option.redirect) {
    redirect(option.redirect);
  }
};

export default setAccessTokenToCookie;
