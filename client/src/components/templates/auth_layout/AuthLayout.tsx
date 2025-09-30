import { Outlet } from "react-router-dom";
import { Appbar } from "@/components/organisms/appbar/Appbar";

const AuthLayout = () => {
  return (
    <>
      <Appbar />
      <Outlet />
    </>
  );
};

export default AuthLayout;
