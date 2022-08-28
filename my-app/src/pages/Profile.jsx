import React from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import updateUserdata from "../components/Firebase/updateUserdata";
const Profile = () => {
  const initialState = [
    { device: "unknown" },
    { displayname: "unknown" },
    { email: "unknown" },
    { questionnaire: false },
    { team: null },
    { usertype: null },
  ];
  const [profileData, setProfileData] = useState(initialState);
  const [isShown, setIsShown] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const dbRef = ref(getDatabase());
  const navigate = useNavigate();

  get(child(dbRef, `profile/${user["uid"]}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setProfileData(snapshot.val());
        console.log(snapshot.val());
      } else {
        setProfileData("No profile data");
      }
    })
    .catch((error) => {
      setProfileData(error);
    });

  const routeChange = () => {
    let path = `/registerprofile`;
    navigate(path);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">Name : {profileData.displayname}</div>
            </div>
            <div className="card">
              <div className="card-body">Gender : {profileData.gender}</div>
            </div>

            <div className="card">
              <div className="card-body">Age : {profileData.age}</div>
            </div>

            <div className="card">
              <div className="card-body">Weight : {profileData.weight}</div>
            </div>

            <div className="card">
              <div className="card-body">
                Exercise Goal : {profileData.exerciseGoal}
              </div>
            </div>

            <div className="card">
              <div className="card-body">email : {profileData.email}</div>
            </div>
            <div className="card">
              <div className="card-body">team : {profileData.team}</div>
            </div>
            <div className="card">
              <div className="card-body">device : {profileData.device}</div>
            </div>
            <div className="card">
              <div className="card-body">userType : {profileData.usertype}</div>
            </div>
            <button className="button" onClick={routeChange}>
              Modify profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
