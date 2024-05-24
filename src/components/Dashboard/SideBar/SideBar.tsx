import { UserRole } from "@/types";
import { dashboardSidebarLinksGenerator } from "@/utils/dashboardSidebarLinksGenerator";
import { Box, List, Stack, Typography } from "@mui/material";
import Link from "next/link";
import SidebarItem from "./SidebarItems";

const Sidebar = () => {
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
        {dashboardSidebarLinksGenerator("user" as UserRole).map(
          (item, index) => (
            <SidebarItem key={index} item={item} />
          )
        )}
      </List>
    </Box>
  );
};

export default Sidebar;
