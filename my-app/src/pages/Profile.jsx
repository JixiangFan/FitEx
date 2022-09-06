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
      teamData: "",
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
        get(child(dbRef, `team/` + snapshot.val().team)).then((snapshot) => {
          if (snapshot.exists())
          {
            this.setState({
              teamData: snapshot.val().team_name,
              createTeamOrNot: false
            });
          } else
          {
            this.setState({
              teamData: null,
              createTeamOrNot: true
            });
          }
        }).catch((error) => {
          this.setState({
            teamData: "server error"
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
    this.props.navigate('/registerprofile')
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
        {console.log(this.state.profileData)}
        <div className="container w-75 pt-10 mt-10">
          <div className="row">
            <div className="col">
              <div class="card mb-3" style={{ "max-width": "540px" }}>
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="https://pereaclinic.com/wp-content/uploads/2019/12/270x270-male-avatar.png" class="img-fluid rounded-start" alt="..."></img>
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">{this.state.profileData.displayname}</h5>
                      <p class="card-text">{this.state.profileData.email}</p>
                      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card mb-3" style={{ "max-width": "540px" }}>

                <div class="col-md-8">
                  <div class="card-body">
                    <div className="row">
                      <div className="col-8">
                        <h5 class="card-title">Team: </h5>
                        <p class="card-text">Food Goal: </p>
                        <p class="card-text">Step Goal:</p>
                       
                      </div>
                      <div className="col">
                        <h5 class="card-title">{this.state.profileData.team}</h5>
                        <p class="card-text">{this.state.profileData.foodGoal}</p>
                        <p class="card-text">{this.state.profileData.stepGoal}</p>
                      </div>
                    </div>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title"> Height: {this.state.profileData.height}</h5>
                  <p className="card-text">Weight: {this.state.profileData.weight}</p>
                  <p className="card-title">Finished questionnaire? : {this.state.profileData.questionnaire ? "True" : "False"}</p>
                  <p className="card-text">User Type: {permission_Level[this.state.profileData.usertype]}</p>
                  <p className="card-text">Report Device: {this.state.profileData.device}</p>
                  <button className="mt-10 btn btn-primary  w-100">Update fitbit access token</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>


    )
  }
}

export default withRouter(Profile)

