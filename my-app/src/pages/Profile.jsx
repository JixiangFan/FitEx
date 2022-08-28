import React from 'react'
import { getAuth } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";
import { useState} from "react";
import updateUserdata from '../components/Firebase/updateUserdata';
const Profile = () => {
  const initialState = [
    { device: "unknown" },
    { displayname: "unknown" },
    { email: "unknown" },
    { questionnaire: false },
    { team: null },
    { usertype: null }
  ]
  const [profileData, setProfileData] = useState(initialState);
  const [isShown, setIsShown] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const dbRef = ref(getDatabase());

  const [changeName, setChangeName] = useState('');




  const handleClick = event => {
    setIsShown(current => !current);
  };


  const handleNameChange = event => {
    setChangeName(event.target.value)
  };

  const handleSubmit = event => {
    alert('A name was submitted: ' + changeName);
    updateUserdata(user['uid'], changeName, profileData.email, profileData.usertype, profileData.questionnaire, profileData.device, profileData.team)
  };





  get(child(dbRef, `users/${user['uid']}`)).then((snapshot) => {
    if (snapshot.exists())
    {
      setProfileData(snapshot.val())
    } else
    {
      setProfileData("No profile data")
    }
  }).catch((error) => {
    setProfileData(error)
  });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                Name : {profileData.displayname}
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                email : {profileData.email}
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                team : {profileData.team}
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                device : {profileData.device}
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                userType : {profileData.usertype}
              </div>
            </div>
            <button className="button" onClick={handleClick}>Modify profile</button>
          </div>
          <div className="col">
            <div>


              {/* 👇️ show elements on click */}
              {isShown && (
                <form onSubmit={handleSubmit}>
                  <label>
                    Name:
                    <input type="text" name="name" defaultValue={profileData.displayname} onChange={handleNameChange} />
                  </label>
                  <label>
                    Team:
                    <input type="text" name="name" defaultValue={profileData.displayname} />
                  </label>
                  <label>
                    device:
                    <input type="text" name="name" defaultValue={profileData.displayname} />
                  </label>
                  <label>
                    User type:
                    <input type="text" name="name" defaultValue={profileData.displayname} />
                  </label>
                  <input type="submit" value="Submit" />
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>


  )
}

export default Profile