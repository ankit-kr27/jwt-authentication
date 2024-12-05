import { Spinner } from "@nextui-org/react";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import UserMenu from "./UserMenu";

const AppContainer = () => {
  const { user, isLoading } = useAuth();
  return isLoading ? (
    <div className="min-h-[100vh] flex justify-center items-center">
      <Spinner />
    </div>
  ) : user ? (
    <div className="p-4 min-h-[100vh]">
      <UserMenu />
      <Outlet />
    </div>
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ redirectUrl: window.location.pathname }} // this is used to redirect the user back to the page they were trying to access before they were redirected to the login page
    />
  );
};

export default AppContainer;
