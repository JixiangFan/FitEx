import React from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";
import { withRouter } from '../components/withRouter';

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import updateUserdata from '../components/Firebase/updateUserdata';

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      profileData: [],
      teamName: [],
      isShow: false,
      time: 0,
      des_string: "",
      total_result: 0,
      table_array: [],
      createTeamOrNot: false,
    };
    this.updateProfile = this.updateProfile.bind(this);
    this.createTeam = this.createTeam.bind(this);
  }

  componentDidMount() {
    const auth = getAuth();
    const user = auth.currentUser;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `profile/${user['uid']}`)).then((snapshot) => {
      if (snapshot.exists())
      {
        this.setState({
          profileData: snapshot.val()
        })
        get(child(dbRef, `team/` + snapshot.val().team)).then((snapshot2) => {
          
          if (snapshot2.exists())
          {
            console.log(snapshot2.val().team_name)
            this.setState({
              teamName: snapshot2.val().team_name
            })
          } else
          {
            this.setState({
              teamName: null,
              createTeamOrNot: true
            });
          }
        }).catch((error) => {
          this.setState({
            teamName: "server error"
          });
        });

      } else
      {
        this.setState({
          profileData: ["no profile data"]
        });
      }
    }).catch((error) => {
      this.setState({
        profileData: ["error"]
      });
    });
    
  }

  updateProfile() {
    this.props.navigate('/updateProfile')
  }

  createTeam() {
    this.props.navigate('/createTeam')
  }

  render() {
    const permission_Level = {
      0: "Member",
      1: "Leader",
      2: "Agent",
      3: "Admin",
    };
    return (
      <>
        <div className="container float-left w-100 pt-10 mt-10 mr-10 text-2xl">
          <div className="row">
            <div className="col">
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src="./profile.jpg"
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">
                        {this.state.profileData.displayname}
                      </h5>
                      <p className="card-text">
                        {this.state.profileData.email}
                      </p>
                      <p className="card-text">
                        <small className="text-muted">
                          Last updated 3 mins ago
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mb-3">
                <div className="col-md-8">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-8">
                        <h5 className="card-title">Team: </h5>
                        <p className="card-text">Daily F/V Cups: </p>
                        <p className="card-text">Daily Step Goal:</p>
                      </div>
                      <div className="col-4">
                        <h5 className="card-title">
                          {this.state.teamName}
                        </h5>
                        <p className="card-text">
                          {this.state.profileData.foodGoal}
                        </p>
                        <p className="card-text">
                          {this.state.profileData.stepGoal}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    {" "}
                    Height: {this.state.profileData.height} ft
                  </h5>
                  <p className="card-text">
                    Weight: {this.state.profileData.weight} lb
                  </p>
                  <p className="card-title">
                    Questionnaire Done:{" "}
                    {this.state.profileData.questionnaire
                      ? "True"
                      : "False"}
                  </p>
                  <p className="card-text">
                    User Type:{" "}
                    {permission_Level[this.state.profileData.usertype]}
                  </p>
                  <p className="card-text">
                    Report Device: {this.state.profileData.device}
                  </p>
                  <button
                    style={{ backgroundColor: "#8AABBD" }}
                    className="mt-10 btn  w-100 border-2 border-slate-500 text-2xl"
                  >
                    Update fitbit access token
                  </button>
                  <button
                    style={{ backgroundColor: "#8AABBD" }}
                    className="mt-10 btn w-100 border-2 border-slate-500 text-2xl"
                    onClick={() => {
                      this.updateProfile();
                    }}
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Profile)

