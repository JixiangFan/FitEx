import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import moment from "moment";
export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser, UserMetadata } = useAuth();

  const startTime = currentUser.metadata.lastLoginAt;
  const endTime = Date.now();

  // Converting epoch milliseconds to seconds
  const startUnixTime = moment.unix(startTime / 1000);
  const endUnixTime = moment.unix(endTime / 1000);

  var hour = moment.duration(endUnixTime.diff(startUnixTime)).asHours();
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
