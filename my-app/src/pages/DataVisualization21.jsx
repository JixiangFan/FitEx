import * as React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  StackingColumnSeries,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";

//一周step展示图

var uid = "";
var goal = 0;
var curr = new Date();
var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
//console.log(firstday);
var startOfWeek = firstday.toISOString().split("T")[0];
//console.log(startOfWeek);
const startOfWeekTime = new Date(startOfWeek).getTime();
//console.log(startOfWeekTime);
var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));
var lastofWeek = lastday.toISOString().split("T")[0];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

class DataVisualization21 extends React.Component {
  onChartLoad(args) {
    let chart = document.getElementById("charts");
    chart.setAttribute("title", "");
  }

  load(args) {
    let selectedTheme = window.location.hash.split("/")[1];
    selectedTheme = selectedTheme ? selectedTheme : "Material";
    args.chart.theme = (
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
    ).replace(/-dark/i, "Dark");
  }

  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      chartData2: [],
      chartData3: [],
    };
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
          goal = snapshot.val().stepGoal;
          //console.log(goal);

          get(child(dbRef, `/FitEx/User/${user["uid"]}`)).then((snapshot) => {
            if (snapshot.exists()) {
              //console.log(snapshot.val());

              let user_fitbit_distance = [];
              let userData2 = [];
              let userData3 = [];
              const fitData = snapshot.val()["FitData"];
              //console.log(fitData);
              if (fitData) {
                const lastSyncTime = Object.keys(fitData).reduce((a, b) =>
                  a < b ? b : a
                );

                user_fitbit_distance = fitData[lastSyncTime]["week_step"];
                //console.log(user_fitbit_distance);

                const userData = user_fitbit_distance.map((element) => {
                  const datetime = element.dateTime;
                  const distance = parseFloat(element.value).toFixed(2);

                  userData2.push({
                    dateTime: datetime,
                    value: distance,
                  });
                  return userData2;
                });

                const userData_notcomplete = user_fitbit_distance.map(
                  (element) => {
                    const datetime = element.dateTime;
                    const distance = parseFloat(element.value).toFixed(2);
                    const reminder = goal - distance;
                    //console.log(datetime);
                    //console.log(reminder);

                    userData3.push({
                      dateTime: datetime,
                      value: reminder,
                    });
                    return userData3;
                  }
                );
                //console.log(userData3);
                this.setState({
                  chartData: userData2,
                  chartData2: userData3,
                });
              }

              let userData4 = [];
              let user_selfreport_distance = 0;
              const selfReportData = snapshot.val()["SelfReportData"];
              if (selfReportData) {
                const lastSelfReportTime = Object.keys(selfReportData).filter(
                  (x) => {
                    if (x < startOfWeekTime) return false;
                    return x;
                  }
                );
                //   console.log(selfReportData);
                //   console.log(lastSelfReportTime);

                lastSelfReportTime.forEach((time) => {
                  const data = selfReportData[time];
                  //console.log(data);
                  let date2 = new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }).format(time);
                  let iso = moment(date2).format("YYYY-MM-DD");
                  //console.log(iso);
                  const temp_data = selfReportData[time]["activity"];
                  //console.log(temp_data);
                  const temp = temp_data.map((x) => {
                    userData4.push({
                      dateTime: iso,
                      value: x["res_step"],
                    });
                  });
                });
                //console.log(userData4);

                const combinedUserData4 = {};
                userData4.forEach((x) => {
                  if (!combinedUserData4[x.dateTime]) {
                    combinedUserData4[x.dateTime] = parseFloat(x.value);
                  } else {
                    combinedUserData4[x.dateTime] += parseFloat(x.value);
                  }
                });

                for (let i = 0; i <= 6; i++) {
                  const d = moment(startOfWeek, "YYYY-MM-DD").add(i, "days");
                  if (!combinedUserData4[d.format("YYYY-MM-DD")]) {
                    combinedUserData4[d.format("YYYY-MM-DD")] = 0.0;
                  }
                  //console.log(d.format("YYYY-MM-DD"));
                }

                //console.log(combinedUserData4);

                let userData5 = [];
                Object.keys(combinedUserData4).forEach((key) => {
                  userData5.push({
                    dateTime: key,
                    value: combinedUserData4[key],
                  });
                  const remain = userData3.find((x) => x.dateTime == key);
                  if (remain) {
                    remain.value -= combinedUserData4[key];
                  } else {
                    userData3.push({
                      dateTime: key,
                      value: parseFloat(goal) - combinedUserData4[key],
                    });
                    //console.log(userData3);
                  }
                });

                userData5 = userData5.sort((a, b) =>
                  a.dateTime < b.dateTime ? -1 : 1
                );
                //console.log(userData5);

                this.setState({
                  chartData2: userData3,
                  chartData3: userData5,
                });
              }
            } else {
              console.log("No data available");
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

  render() {
    return (
      <div className="control-pane">
        <style>{SAMPLE_CSS}</style>
        <div className="control-section">
          <ChartComponent
            id="charts21"
            style={{ textAlign: "center" }}
            primaryXAxis={{
              majorGridLines: { width: 0 },
              minorGridLines: { width: 0 },
              majorTickLines: { width: 0 },
              minorTickLines: { width: 0 },
              interval: 1,
              lineStyle: { width: 0 },
              labelIntersectAction: "Rotate45",
              valueType: "Category",
            }}
            primaryYAxis={{
              title: "Exercises",
              lineStyle: { width: 0 },
              minimum: 0,
              maximum: 20000,
              interval: 1000,
              majorTickLines: { width: 0 },
              majorGridLines: { width: 1 },
              minorGridLines: { width: 1 },
              minorTickLines: { width: 0 },
              labelFormat: "{value}",
            }}
            width={Browser.isDevice ? "100%" : "100%"}
            chartArea={{ border: { width: 0 } }}
            load={this.load.bind(this)}
            title="This Week's Activity Steps"
            loaded={this.onChartLoad.bind(this)}
            tooltip={{ enable: true }}
          >
            <Inject
              services={[StackingColumnSeries, Category, Legend, Tooltip]}
            />
            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={this.state.chartData}
                xName="dateTime"
                yName="value"
                name="Fitbit Reported Steps"
                type="StackingColumn"
              ></SeriesDirective>
              <SeriesDirective
                dataSource={this.state.chartData3}
                xName="dateTime"
                yName="value"
                name="Self-Report Completed Steps"
                type="StackingColumn"
              ></SeriesDirective>
              <SeriesDirective
                dataSource={this.state.chartData2}
                xName="dateTime"
                yName="value"
                name="Incomplete Steps"
                type="StackingColumn"
              ></SeriesDirective>
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    );
  }
}

export default DataVisualization21;
