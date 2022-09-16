import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
export default function AuthRoute({ component: Component, ...rest }) {
  const auth = getAuth();
  const user = auth.currentUser;
  const dbRef = ref(getDatabase());
  const { currentUser } = useAuth();
  if (user)
  {
    get(child(dbRef, `profile/${user["uid"]}`))
      .then((snapshot) => {
        var authCode = snapshot.val()["usertype"]
        if (authCode > 1)
        {
          return <Outlet />
        }
        else
        {
          return <Navigate to="/dashboard" />
        }
     
      })
  }
  else
  {
    return <Navigate to="/login" />
    }


}


