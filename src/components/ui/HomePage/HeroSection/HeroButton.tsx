"use client";

import { getUserInfo } from "@/services/auth.services";
import { TJwtPayload } from "@/types";
import { Button } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

const HeroButton = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const user = getUserInfo() as TJwtPayload;

    if (!user) {
      setUserRole("");
    } else {
      setUserRole(user.role);
    }
  }, []);

  return (
    userRole === "user" && (
      <Button
        variant="contained"
        color="primary"
        component={Link}
        href="/dashboard/post-trip"
        sx={{
          mt: 2,
          px: {
            xs: 1,
            sm: 2,
            md: "3rem",
          },
          py: 2,
          fontSize: {
            xs: "0.6rem",
            sm: "0.8rem",
            md: "1rem",
          },
        }}
      >
        Share Your Trip
      </Button>
    )
  );
};

export default HeroButton;
