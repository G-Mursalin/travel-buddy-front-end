import { getUserInfo } from "@/services/auth.services";
import { TJwtPayload, UserRole } from "@/types";
import { dashboardSidebarLinksGenerator } from "@/utils/dashboardSidebarLinksGenerator";
import { Box, List, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import SidebarItem from "./SidebarItems";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [userRole, setUserRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    const user = getUserInfo() as TJwtPayload;

    if (!user) {
      return router.push("/login");
    }

    setUserRole(user.role);
  }, [router]);

  return (
    <Box>
      <Stack
        sx={{
          py: 1,
          mt: 1,
        }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={1}
        component={Link}
        href="/"
      >
        <Typography component="h1">Travel Buddy</Typography>
      </Stack>
      <List>
        {dashboardSidebarLinksGenerator(userRole as UserRole).map(
          (item, index) => (
            <SidebarItem key={index} item={item} />
          )
        )}
      </List>
    </Box>
  );
};

export default Sidebar;
