import { USER_ROLE } from "@/constants/role";
import { DrawerItem, UserRole } from "@/types";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyIcon from "@mui/icons-material/Key";
import TryIcon from "@mui/icons-material/Try";

export const dashboardSidebarLinksGenerator = (
  role: UserRole
): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];

  const defaultMenus = [
    {
      title: "Change Password",
      path: "change-password",
      icon: KeyIcon,
    },
    {
      title: "My Profile",
      path: "my-profile",
      icon: KeyIcon,
    },
  ];

  switch (role) {
    case USER_ROLE.ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "User Management",
          path: `${role}/user-management`,
          icon: TryIcon,
        }
      );
      break;

    case USER_ROLE.USER:
      roleMenus.push(
        {
          title: "Dashboard",
          path: "/",
          icon: DashboardIcon,
        },
        {
          title: "Post A Trip",
          path: `post-trip`,
          icon: CalendarMonthIcon,
        }
      );
      break;

    default:
      break;
  }

  return [...roleMenus, ...defaultMenus];
};
