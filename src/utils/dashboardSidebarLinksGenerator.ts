import { USER_ROLE } from '@/constants/role';
import { DrawerItem, UserRole } from '@/types';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import KeyIcon from '@mui/icons-material/Key';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import Person2Icon from '@mui/icons-material/Person2';

export const dashboardSidebarLinksGenerator = (
  role: UserRole
): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];

  const defaultMenus = [
    {
      title: 'Change Password',
      path: 'change-password',
      icon: KeyIcon,
    },
    {
      title: 'My Profile',
      path: 'my-profile',
      icon: Person2Icon,
    },
  ];

  switch (role) {
    case USER_ROLE.ADMIN:
      roleMenus.push(
        {
          title: 'Dashboard',
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: 'User Management',
          path: `${role}/user-management`,
          icon: ManageAccountsIcon,
        },
        {
          title: 'Trip Management',
          path: `${role}/trip-management`,
          icon: ManageSearchIcon,
        }
      );
      break;

    case USER_ROLE.USER:
      roleMenus.push(
        {
          title: 'Dashboard',
          path: '/',
          icon: DashboardIcon,
        },
        {
          title: 'Post A Trip',
          path: `post-trip`,
          icon: CalendarMonthIcon,
        },
        {
          title: 'Your Posts',
          path: `posts`,
          icon: AllInboxIcon,
        },
        {
          title: 'Trips History',
          path: 'trip-requested-history',
          icon: HistoryIcon,
        }
      );
      break;

    default:
      break;
  }

  return [...roleMenus, ...defaultMenus];
};
