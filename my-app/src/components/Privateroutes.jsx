import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import moment from "moment";
export default function PrivateRoute({ component: Component, ...rest }) {

  const { currentUser} = useAuth();

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}


