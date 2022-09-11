import React, { Component } from "react";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, child, get, onValue } from "firebase/database";

//Task Progress

var uid = "";
var team_id = "";
var team_member = [];
var team_goal = 0;
var team_steps = 0;
var team_result = 0;



var curr = new Date();
//console.log(curr);
var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
//console.log(firstday);
var startOfWeek = firstday.toISOString().split("T")[0];
//console.log(startOfWeek);
const startOfWeekTime = new Date(startOfWeek).getTime();
//console.log(startOfWeekTime);


class DataVisualization4 extends React.Component {
  
  
  componentDidMount() {
    const auth = getAuth();
    const user = auth.currentUser;
    //console.log(user);
    uid = user.uid;

    const dbRef = ref(getDatabase());

    get(child(dbRef, `profile/${user["uid"]}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
        //console.log(snapshot.val());
        team_id = snapshot.val().team;
        //console.log(team_id);
        
        get(child(dbRef, "/team/" + team_id))
          .then((snapshot) => {
            if (snapshot.exists()) {
              //console.log(snapshot.val());
              team_goal = snapshot.val().team_day_goal;
              //console.log(team_goal);
              team_member = snapshot.val().team_member;

              const promises = team_member.map((member_id) =>
                get(child(dbRef, "/FitEx/User/" + member_id))
              );

              Promise.all(promises).then((values) => {
                //console.log(values);
                let total_distance = 0;
                let userData = [];
                const userFitbitDistances = values.map((x) => {
                  if (x && x.exists()) {
                    const fitData = x.val()["FitData"];
                    //console.log(fitData);
                    let user_name = "";
                    let user_fitbit_distance = 0;
                    if (fitData) {
                      //console.log(fitData);
                      const lastSyncTime = Object.keys(fitData).reduce((a, b) =>
                        a < b ? b : a
                      );
                      user_name = fitData[lastSyncTime].username;
                      //console.log(fitData[lastSyncTime]["week_distance"]);

                      user_fitbit_distance = fitData[lastSyncTime][
                        "week_step"
                      ]?.reduce(
                        (prev, current) => prev + parseFloat(current.value),
                        0
                      );

                      if (typeof user_fitbit_distance == "undefined")
                        user_fitbit_distance = 0;

                      total_distance += user_fitbit_distance;
                    }

                    let user_selfreport_distance = 0;
                    const selfReportData = x.val()["SelfReportData"];
                    if (selfReportData) {
                      const lastSelfReportTime = Object.keys(
                        selfReportData
                      ).filter((x) => {
                        if (x < startOfWeekTime) return false;
                        return x;
                      });

                      //console.log(lastSelfReportTime);
                      lastSelfReportTime.forEach((time) => {
                        const data = selfReportData[time];
                        //console.log(data);

                        if (!user_name || user_name === "")
                          user_name = data["username"];

                        user_selfreport_distance += data["activity"]?.reduce(
                          (prev, current) =>
                            prev + parseFloat(current["res_step"]),
                          0
                        );
                        //console.log(user_selfreport_distance);
                      });
                      total_distance += user_selfreport_distance;  
                    }
                  }
                });
                this.setState({
                  series: [((total_distance / team_goal) * 100).toFixed(2)],
                });
              });
            //   team_result = (total_distance / team_goal) * 100;
            //   console.log(team_result);

              // team_steps = snapshot.val().team_day_step_total;
              // console.log(team_steps);
              // team_result = (team_steps / team_goal) * 100;
              // console.log(team_result);

              
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
        
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
    constructor(props) {
    super(props);

    this.state = {
      series: [team_result],
      options: {
        chart: {
          height: 350,
          type: "radialBar",
          offsetY: -10,
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
              name: {
                fontSize: "16px",
                color: undefined,
                offsetY: 120,
              },
              value: {
                offsetY: 76,
                fontSize: "22px",
                color: undefined,
                formatter: function (val) {
                  return val + "%";
                },
              },
            },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91],
          },
        },
        stroke: {
          dashArray: 4,
        },
        labels: ["Task Progress"],
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="radialBar"
          height={350}
        />
      </div>
    );
  }
}

export default DataVisualization4;
