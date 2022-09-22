import React from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import { withRouter } from '../components/withRouter';
import getUserdata from "../components/Firebase/getUserdata";

class LeaderBoard2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profileData: [["loading","loading","loading"],["loading","loading","loading"],["loading","loading","loading"]],
            stepData: [],
            teamData: [],
            isShow: false,
            time: 0,
            des_string: "",
            total_result: 0,
            table_array: [],
            createTeamOrNot: false,
        };
        this.updateProfile = this.updateProfile.bind(this);
        this.createTeam = this.createTeam.bind(this);
        this.getuserProfile = this.getuserProfile.bind(this);
    }



    componentDidMount() {
        const dbRef = ref(getDatabase());
        var curr = new Date();
        var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
        var startOfWeek = firstday.toISOString().split("T")[0];
        const startOfWeekTime = new Date(startOfWeek).getTime();
        get(child(dbRef, `FitEx/User`)).then((snapshot) => {
            let userReuslt = []

            if (snapshot.exists())
            {
                for (const [key, value] of Object.entries(snapshot.val()))
                {
                    var distance = 0
                    if (value["FitData"])
                    {
                        var user_fitbit_distance = 0
                        const lastSyncTime = Object.keys(value["FitData"]).reduce(
                            (a, b) => (a < b ? b : a)
                        );

                        user_fitbit_distance = value["FitData"][lastSyncTime][
                            "week_distance"
                        ]?.reduce(
                            (prev, current) => prev + parseFloat(current.value),
                            0
                        );

                        if (typeof distance == "undefined")
                            user_fitbit_distance = 0;
                        distance += user_fitbit_distance;
                    }

                    if (value["SelfReportData"])
                    {
                        const lastSelfReportTime = Object.keys(
                            value["SelfReportData"]
                        ).filter((x) => {
                            if (x < startOfWeekTime) return false;
                            return x;
                        });

                        lastSelfReportTime.forEach((time) => {
                            const data = value["SelfReportData"][time];

                            distance += data["activity"]?.reduce(
                                (prev, current) =>
                                    prev + parseFloat(current["res_mile"]),
                                0
                            );

                        });


                    }
                    userReuslt.push([key, distance])

                }

            }



            userReuslt.sort(function (a, b) {
                return b[1] - a[1];
            });
            let teamProfile = {}
            const userlist = userReuslt.map((step, id) => step[0])
            const steplist = userReuslt.map((step, id) => step[1])
            const promises = userlist.map((member_id) =>
                get(child(dbRef, "/profile/" + member_id))
            );
            var counter = 0;
            Promise.all(promises).then((snapshot) => {
                snapshot.map((x) => {
                    if (x && x.exists())
                    {
                        const teamID = x.val()["team"]
                        var step = parseFloat(steplist[counter])
                        if (teamID in teamProfile)
                        {
                            teamProfile[teamID] = parseFloat(teamProfile[teamID]) + step
                        } else
                        {
                            teamProfile[teamID] = step
                        }

                        counter += 1
                    }

                })

                var items = Object.keys(teamProfile).map(function (key) {
                    return [key, teamProfile[key]];
                });

                // Sort the array based on the second element
                items.sort(function (first, second) {
                    return second[1] - first[1];
                });


                const teampromises = items.map((teamID) =>
                    get(child(dbRef, "/team/" + teamID[0]))
                );
                
                Promise.all(teampromises).then((snapshot) =>
                {
                    var counter2 = 0
                    snapshot.map((x) => { 
                        if (x && x.exists())
                        { 
                            items[counter2].push(x.val()["team_name"])
                        }
                        counter2+=1
                    })
                    this.setState({
                        profileData: items,
                        stepData: steplist
                    });
                })


                
            })


        }).catch((error) => {
            this.setState({
                profileData: ["error"]
            });
        });

        // get(child(dbRef, `team/`)).then((snapshot) => {
        //     if (snapshot.exists())
        //     {
        //         this.setState({
        //             teamData: snapshot.val()
        //         })
        //     }
        // }).catch((error) => {
        //     this.setState({
        //         teamData: ["error"]
        //     });
        // });

    }

    updateProfile() {
        this.props.navigate('/registerprofile')
    }

    createTeam() {
        this.props.navigate('/createTeam')
    }

    async getuserProfile(id) {
        return await getUserdata(id).then(result => {
            return result
        })
    }

    render() {
        const permission_Level = {
            0: "Member",
            1: "Leader",
            2: "Agent",
            3: "Admin",
        };
        console.log(this.state.profileData)

        return (
          <section className="main-content w-full h-full float-right">
            <div className="container">
              {/* <h1 className="float-center">Top Teams</h1> */}
              <div className="row">
                <div className="col-sm-4">
                  <div className="leaderboard-card">
                    <div className="leaderboard-card__top">
                      <h2 className="h3 text-center pb-1">No.2</h2>
                      <h3 className="h4 text-center">
                        {parseFloat(
                          this.state.profileData[1][1]
                        ).toFixed(2)}{" "}
                        miles
                      </h3>
                    </div>
                    <div className="leaderboard-card__body">
                      <div className="text-center pt-10">
                        <h5 className="mb-0 pt-1 pb-1">
                          {this.state.profileData[1][2]}
                        </h5>

                        <div className="d-flex justify-content-between align-items-center">
                          <span>
                            <i className="fa fa-map-marker" />
                            Blacksburg
                          </span>
                          <button className="btn btn-outline-success btn-sm">
                            Congratulate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="leaderboard-card">
                    <div className="leaderboard-card__top">
                      <h2 className="h3 text-center pb-1">No.1</h2>
                      <h3 className="h4 text-center">
                        {parseFloat(
                          this.state.profileData[0][1]
                        ).toFixed(2)}{" "}
                        miles
                      </h3>
                    </div>
                    <div className="leaderboard-card__body">
                      <div className="text-center pt-10">
                        <h5 className="mb-0 pt-1 pb-1">
                          {this.state.profileData[0][2]}
                        </h5>

                        <div className="d-flex justify-content-between align-items-center">
                          <span>
                            <i className="fa fa-map-marker" />
                            Blacksburg
                          </span>
                          <button className="btn btn-outline-success btn-sm">
                            Congratulate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="leaderboard-card">
                    <div className="leaderboard-card__top">
                      <h2 className="h3 text-center pb-1">No.3</h2>
                      <h3 className="h4 text-center">
                        {parseFloat(
                          this.state.profileData[2][1]
                        ).toFixed(2)}{" "}
                        miles
                      </h3>
                    </div>
                    <div className="leaderboard-card__body">
                      <div className="text-center pt-10">
                        <h5 className="mb-0 pt-1 pb-1">
                          {this.state.profileData[2][2]}
                        </h5>

                        <div className="d-flex justify-content-between align-items-center">
                          <span>
                            <i className="fa fa-map-marker" />
                            Blacksburg
                          </span>
                          <button className="btn btn-outline-success btn-sm">
                            Congratulate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <br />
              <h4 className="h4">All Teams</h4>

              <table className="table">
                <thead>
                  <tr>
                    <th>Team</th>
                    <th>Miles</th>
                    <th>Location</th>
                    <th>Congratulate</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.profileData.map(function(object, i) {
                    return (
                      <>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="user-info__basic">
                                <h5 className="mb-0">{object[2]}</h5>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-baseline">
                              <h4 className="mr-1">
                                {parseFloat(object[1]).toFixed(2)}
                              </h4>
                              {/* <small className="text-success">
                                <i className="fa fa-arrow-up" />
                                5%
                              </small> */}
                            </div>
                          </td>
                          <td>Blacksburg</td>
                          <td>
                            <button className="btn btn-success btn-sm">
                              Congratulate
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        );
    }
}

export default LeaderBoard2

