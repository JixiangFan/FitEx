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
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  Name : {this.state.profileData.displayname}
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  Gender : {this.state.profileData.gender}
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  Age : {this.state.profileData.age}
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  Weight : {this.state.profileData.weight}
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  Exercise Goal : {this.state.profileData.exerciseGoal}
                </div>

              </div>


              <div className="card">
                <div className="card-body">
                  email : {this.state.profileData.email}
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  team : {this.state.teamData ? this.state.teamData
                    : <NavLink
                    className="navbar-item"
                    activeClassName="is-active"
                    to="/createTeam"
                  >
                    Create Team
                  </NavLink>
                  }
                  
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  device : {this.state.profileData.device}
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  userType : {permission_Level[this.state.profileData.usertype]}
                </div>
              </div>
              <button className="btn btn-outline-primary"
                onClick={this.updateProfile}>Update Profile</button>
            </div>

          </div>
        </div>
      </>


    )
  }
}

export default withRouter(Profile)

