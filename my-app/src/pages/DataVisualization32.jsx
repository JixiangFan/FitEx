import React, { Component } from "react";
import Chart from "react-apexcharts";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, child, get, onValue } from "firebase/database";

//个人mile weekly

var fitbit_result = 0;
var self_report_result = 0;
var uid = "";
var goal = 0;
var total = 0;
var curr = new Date();
//console.log(curr);
var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
//console.log(firstday);
var startOfWeek = firstday.toISOString().split("T")[0];
//console.log(startOfWeek);
const startOfWeekTime = new Date(startOfWeek).getTime();
//console.log(startOfWeekTime);

const date = new Date();
date.setHours(0, 0, 0, 0);
const local_morning = date.getTime();
//console.log(date.toISOString().split("T")[0]);
//console.log(local_morning);

function valueToPercent(value) {
  return (value * 100) / goal;
}
class DataVisualization32 extends Component {
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
          goal = snapshot.val().stepGoal / 2000 * 7;
          //console.log(goal);

          let user_fitbit_distance = [];

          get(child(dbRef, `/FitEx/User/${user["uid"]}`)).then((snapshot) => {
            if (snapshot.exists()) {
              //console.log(snapshot.val());

              const fitData = snapshot.val()["FitData"];
              //console.log(fitData);
              if (fitData) {
                const lastSyncTime = Object.keys(fitData).reduce((a, b) =>
                  a < b ? b : a
                );
                //console.log(lastSyncTime);
                //console.log(lastSyncTime - local_morning);

                if (lastSyncTime > startOfWeekTime) {
                  user_fitbit_distance =
                    fitData[lastSyncTime]["activity"][
                      "summary"
                    ]["distances"];
                  //console.log(user_fitbit_distance);
                  const found = user_fitbit_distance.find(
                    (obj) => {
                      return obj.activity === "total";
                    }
                  );

                  fitbit_result = parseFloat(found.distance);
                  //console.log(valueToPercent(fitbit_result));
                }
              }

              const selfReportData = snapshot.val()["SelfReportData"];
              let userData4 = [];

              if (selfReportData) {
                const lastSelfReportTime = Object.keys(selfReportData).filter(
                  (x) => {
                    //这里需要考虑
                    //2.移除上周数据
                    if (x < startOfWeekTime)
                      return false;
                    //console.log(x - local_morning);
                    return x;
                  }
                );
                //console.log(lastSelfReportTime);

                lastSelfReportTime.forEach((time) => {
                  const data = selfReportData[time];
                  //console.log(data);

                  const temp_data = selfReportData[time]["activity"];
                  //console.log(temp_data);
                  const temp = temp_data.map((x) => {
                    userData4.push({
                      value: parseFloat(x["res_mile"]),
                    });
                  });
                });

                //console.log(userData4);

                self_report_result = userData4.reduce(
                  (partialSum, a) => partialSum + a.value,
                  0
                );
                //console.log(self_report_result);
              }

              total = fitbit_result + self_report_result;
              //console.log(total);

              this.setState({
                series: [
                  valueToPercent(total),
                  valueToPercent(fitbit_result),
                  valueToPercent(self_report_result),
                ],
              });
            }
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
      options: {
        colors: ["#FF0033", "#333399", "#CCCC00"],
        labels: ["Total Miles", "Fitbit Miles", "SelfReport"],
        legend: {
          show: true,
          floating: true,
          showForSingleSeries: false,
          showForNullSeries: true,
          showForZeroSeries: true,
          floating: false,
          fontSize: "18px",
          fontFamily: "Helvetica, Arial",
          height: undefined,
          formatter: undefined,
          position: "right",
          offsetX: 370,
          offsetY: 15,
          labels: {
            useSeriesColors: true,
          },
          markers: {
            width: 12,
            height: 12,
            strokeWidth: 0,
            strokeColor: "#fff",
            radius: 12,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0,
          },
          onItemClick: {
            toggleDataSeries: true,
          },
          onItemHover: {
            highlightDataSeries: true,
          },
        },
        plotOptions: {
          radialBar: {
            size: undefined,
            inverseOrder: false,
            startAngle: 0,
            //endAngle: 275,
            offsetX: 100,
            offsetY: 0,
            hollow: {
              margin: 5,
              size: "50%",
              background: "transparent",
              image: undefined,
              imageWidth: 150,
              imageHeight: 150,
              imageOffsetX: 0,
              imageOffsetY: 0,
              imageClipped: true,
              position: "front",
              dropShadow: {
                enabled: false,
                top: 0,
                left: 0,
                blur: 3,
                opacity: 0.5,
              },
            },
            track: {
              show: true,
              startAngle: undefined,
              endAngle: undefined,
              background: "#f2f2f2",
              strokeWidth: "97%",
              opacity: 1,
              margin: 5,
              dropShadow: {
                enabled: false,
                top: 0,
                left: 0,
                blur: 3,
                opacity: 0.5,
              },
            },
            dataLabels: {
              show: true,
              name: {
                show: true,
                fontSize: "22px",
                fontFamily: undefined,
                color: undefined,
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: "16px",
                fontFamily: undefined,
                color: undefined,
                offsetY: 16,
                formatter: function(val) {
                  return (val * (goal / 100)).toFixed(2);
                },
              },
              total: {
                show: true,
                label: "Mile Goal",
                color: "#373d3f",
                formatter: function(w) {
                  return goal.toFixed(2);
                },
              },
            },
          },
        },
      },

      series: [total, fitbit_result, self_report_result],
    };
  }

  render() {
    return (
      <div className="donut">
        <h2 className="text-center text-2xl">Weekly Miles</h2>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="radialBar"
          width="570"
          id = "32"
        />
      </div>
    );
  }
}

export default DataVisualization32;
