import React from "react";
import { Header } from "../components";
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { Pie as PieChart } from "../components";

//已知bug
//如果一个组员离开小组，firebase无法自动更新key，会产生一个empty object导致程序自动弹出
//建议在team或者member里进行调整

var uid = "";
var u_name = "";
var team_id = "";
var team_name = "";
var team_member = [];
var curr = new Date();
var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
var startOfWeek = firstday.toISOString().split("T")[0];
const startOfWeekTime = new Date(startOfWeek).getTime();
//console.log(startOfWeekTime);

class DataVisualization1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pieCharData: [],
    };
    /*
     * 图像上的百分比根据y值自动计算调整
     * x,y值直接从firebase-> Fitex -> user -> userid -> fitdata ->
     */
  }

  componentDidMount() {
    const auth = getAuth();
    const user = auth.currentUser;
    //console.log(user);
    uid = user.uid;

    const dbRef = ref(getDatabase());
    //console.log(dbRef);
    get(child(dbRef, `profile/${user["uid"]}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          //console.log(snapshot.val());
          u_name = snapshot.val().displayname;
          team_id = snapshot.val().team;
          //console.log(team_id);

          get(child(dbRef, "/team/" + team_id))
            .then((snapshot) => {
              if (snapshot.exists()) {
                team_name = snapshot.val().team_name;
                team_member = snapshot.val().team_member;
                console.log(team_member);

                const promises = team_member.map((member_id) =>
                  get(child(dbRef, "/FitEx/User/" + member_id))
                );

                //console.log(promises);

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
                        const lastSyncTime = Object.keys(fitData).reduce(
                          (a, b) => (a < b ? b : a)
                        );
                        user_name = fitData[lastSyncTime].username;
                        //console.log(fitData[lastSyncTime]["week_distance"]);

                        user_fitbit_distance = fitData[lastSyncTime][
                          "week_distance"
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
                              prev + parseFloat(current["res_mile"]),
                            0
                          );
                          //console.log(user_selfreport_distance);
                        });
                        total_distance += user_selfreport_distance;
                        //console.log(total_distance);
                        userData.push({
                          name: user_name,
                          distance:
                            user_fitbit_distance + user_selfreport_distance,
                        });
                      }
                    }
                  });

                  const chartData = userData.map((x) => {
                    return {
                      x: x.name,
                      y: x.distance.toFixed(2),
                      text:
                        ((x.distance / total_distance) * 100).toFixed(2) + "%",
                    };
                  });

                  this.setState({
                    pieChartData: chartData,
                  });
                });
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

  render() {
    return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="DA1" />

        <div className="flex gap-10 flex-wrap justify-center">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
            <div className="flex justify-between">
              <p className="font-semibold text-xl">Team Task Contribution</p>
            </div>

            <div className="w-full">
              <PieChart
                id="chart-pie"
                data={this.state.pieChartData}
                legendVisiblity
                height="full"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DataVisualization1;
