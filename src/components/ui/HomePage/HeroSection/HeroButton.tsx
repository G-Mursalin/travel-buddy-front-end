"use client";

import { USER_ROLE } from "@/constants/role";
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
    <Button
      variant="contained"
      color="primary"
      component={Link}
      href={userRole === USER_ROLE.USER ? "/dashboard/post-trip" : "/dashboard"}
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
  );
};

export default HeroButton;
