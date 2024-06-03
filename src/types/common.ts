import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type UserRole = "admin" | "user";

export interface DrawerItem {
  title: string;
  path: string;
  parentPath?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  child?: DrawerItem[];
}

export type IMeta = {
  page: number;
  limit: number;
  total: number;
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
  status: "in-progress" | "blocked"; // Assuming there are multiple possible statuses
  role: UserRole;
};
