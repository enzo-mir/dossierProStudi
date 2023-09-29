import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const PrivateNav = ({ word }) => {
  return word ? <Outlet /> : <Navigate to="/" />;
};
