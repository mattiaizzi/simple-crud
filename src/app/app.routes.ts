import { RoutesConfig } from "./models/routesConfig";
import { UsersPage } from "./pages/UsersPage/UsersPage";
import { CreateUserPage } from "./pages/CreateUserPage/CreateUserPage";
import { UserDetailPage } from "./pages/UserDetailPage/UserDetailPage";
import { EditUserPage } from "./pages/EditUserPage/EditUserPage";

export const routesConfig: RoutesConfig = {
  paths: [
    {
      key: "users",
      path: "/users",
      exact: true,
      component: UsersPage,
    },
    {
      key: "users-detail",
      path: "/users/:id",
      exact: true,
      component: UserDetailPage,
    },
    {
      key: "users-create",
      path: "/users/create-user",
      exact: true,
      component: CreateUserPage,
    },
    {
      key: "users-edit",
      path: "/users/:id/edit",
      exact: true,
      component: EditUserPage,
    },
  ],
  defaultPath: "users",
};
