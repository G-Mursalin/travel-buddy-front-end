import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export type UserRole = 'admin' | 'user';

export interface DrawerItem {
  title: string;
  path: string;
  parentPath?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
  child?: DrawerItem[];
}

export type IMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

type ValidationErrorSource = {
  path: string;
  message: string;
};

export type ErrorResponse = {
  status: number;
  data: {
    success: boolean;
    message: string;
    errorSources: ValidationErrorSource[];
  };
};

export type TJwtPayload = {
  id: string;
  userName: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

export type TUser = {
  _id: string;
  userName: string;
  email: string;
  profileImage: string;
  bio: string;
  status: 'in-progress' | 'blocked';
  role: UserRole;
};

export type TPhoto = {
  id: number;
  image: string;
};

export type TTrip = {
  _id: string;
  title: string;
  destination: string;
  description: string;
  startDate: string;
  endDate: string;
  maxNumberOfPeople: number;
  numberOfBookingSpot: number;
  budget: number;
  travelType: 'Adventure' | 'Relaxation' | 'Cultural' | 'Family' | 'Business';
  photos: TPhoto[];
  user: TUser;
};
