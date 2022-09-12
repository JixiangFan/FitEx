import { push } from "firebase/database";
import React from "react";
import writeDeviceData from "../components/Firebase/writeDeviceData";
import setUserData from "../components/Firebase/writeActivityData";
import { Header } from "../components";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Selection,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth } from "firebase/auth";

var access_token = "";
var uid = "";
var u_name = "";

//const access_token =
//  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzhLM1giLCJzdWIiOiJCNFRaSFciLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd3NvYyB3YWN0IHdveHkgd3RlbSB3d2VpIHdzZXQgd2xvYyB3cmVzIiwiZXhwIjoxNjYyMjQxNjIxLCJpYXQiOjE2NTk2NDk2NDh9.B8OFnUhV2YqUuWFO9oZ8zvtglLlpssaXEpAtnMfCDR0";

const toolbarOptions = [`PdfExport`, `ExcelExport`, `CsvExport`, "Search"];
//let today = (new Date() - 1).toISOString().slice(0, 10);
//const today = "2022-08-24";
const d = new Date();
//console.log(d);
const today =
  d.getFullYear() +
  "-" +
  ("0" + (d.getMonth() + 1)).slice(-2) +
  "-" +
  ("0" + d.getDate()).slice(-2);
//console.log(today);

var curr = new Date();
var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));
var startOfWeek = firstday.toISOString().split("T")[0];
var lastofWeek = lastday.toISOString().split("T")[0];
//console.log(startOfWeek);
//console.log(lastofWeek);

//const utcDay = d.toISOString().slice(0, 10);
//console.log(utcDay);

class FitbitSync extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devices_result: [],
      activities_result: {},
      summary_array: [],
      error_response: null,
      intraday_result: [],
      week_step_result: [],
      week_distance_result: [],
      week_calories_result: [],
    };
  }

  toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i) rv[i] = arr[i];
    return rv;
  }

  //get data from api
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
          u_name = snapshot.val().displayname;
          //console.log(u_name);
          access_token = snapshot.val().fitbitToken;
          console.log(access_token);

          fetch("https://api.fitbit.com/1/user/-/devices.json", {
            method: "GET",
            headers: {
              Authorization: "Bearer " + access_token,
            },
          })
            .then((response, reject) => {
              if (response.ok) {
                return response.json();
              } else {
                this.setState({
                  error_response: response,
                });
                return Promise.reject(reject);
              }
            })
            .then((devices) => {
              //console.log(devices);
              //activity api
              fetch(
                `https://api.fitbit.com/1/user/-/activities/date/${today}.json`,
                {
                  method: "GET",
                  headers: {
                    Authorization: "Bearer " + access_token,
                  },
                }
              )
                .then((response, reject) => {
                  if (response.ok) {
                    return response.json();
                  } else {
                    this.setState({
                      error_response: response,
                    });
                    return Promise.reject(reject);
                  }
                })
                .then((activities) => {

                  fetch(
                    `https://api.fitbit.com/1/user/-/activities/steps/date/${today}/1d/15min/time/00:00/23:59.json`,
                    {
                      method: "GET",
                      headers: {
                        Authorization: "Bearer " + access_token,
                      },
                    }
                  )
                    .then((response, reject) => {
                      if (response.ok) {
                        return response.json();
                      } else {
                        this.setState({
                          error_response: response,
                        });
                        return Promise.reject(reject);
                      }
                    })
                    .then((intra) => {
                      const intra_array =
                        intra["activities-steps-intraday"].dataset;
                      //console.log(intra_array);

                      fetch(
                        `https://api.fitbit.com/1/user/-/activities/steps/date/${startOfWeek}/${lastofWeek}.json`,
                        {
                          method: "GET",
                          headers: {
                            Authorization: "Bearer " + access_token,
                          },
                        }
                      )
                        .then((response, reject) => {
                          if (response.ok) {
                            return response.json();
                          } else {
                            this.setState({
                              error_response: response,
                            });
                            return Promise.reject(reject);
                          }
                        })
                        .then((weekly_s) => {
                          //console.log(xxx);
                          const week_array = weekly_s["activities-steps"];

                          fetch(
                            `https://api.fitbit.com/1/user/-/activities/distance/date/${startOfWeek}/${lastofWeek}.json`,
                            {
                              method: "GET",
                              headers: {
                                Authorization: "Bearer " + access_token,
                                "accept-language": "en_US",
                              },
                            }
                          )
                            .then((response, reject) => {
                              if (response.ok) {
                                return response.json();
                              } else {
                                this.setState({
                                  error_response: response,
                                });
                                return Promise.reject(reject);
                              }
                            })
                            .then((weekly_d) => {
                              //console.log(weekly_d);
                              const week_array_d =
                                weekly_d["activities-distance"];

                              fetch(
                                `https://api.fitbit.com/1/user/-/activities/calories/date/${startOfWeek}/${lastofWeek}.json`,
                                {
                                  method: "GET",
                                  headers: {
                                    Authorization: "Bearer " + access_token,
                                  },
                                }
                              )
                                .then((response, reject) => {
                                  if (response.ok) {
                                    return response.json();
                                  } else {
                                    this.setState({
                                      error_response: response,
                                    });
                                    return Promise.reject(reject);
                                  }
                                })

                                .then((weekly_c) => {
                                  //const summary_array = result["activities-steps-intraday"].dataset;
                                  console.log(weekly_c);
                                  const week_array_c =
                                    weekly_c["activities-calories"];

                                  writeDeviceData(
                                    uid,
                                    u_name,
                                    true,
                                    activities,
                                    this.toObject(devices),
                                    intra_array,
                                    week_array,
                                    week_array_d,
                                    week_array_c
                                  );

                                  //console.log(activities);
                                  const key_names = ["steps", "caloriesOut"];
                                  const summary_array = key_names.map(
                                    (key_name) => ({
                                      Name: key_name,
                                      Value: activities.summary[key_name],
                                    })
                                  );

                                  this.setState({
                                    devices_result: devices,
                                    activities_result: activities,
                                    summary_array: summary_array,
                                    intraday_result: intra_array,
                                    week_step_result: week_array,
                                    week_distance_result: week_array_d,
                                    week_calories_result: week_array_c,
                                  });
                                });
                            });                 
                        });
                    });
                });
            })
            .catch((err) => {
              console.log(err);
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
    const error_response = this.state.error_response;
    let error = this.state.error_response ? (
      <span>An error occurred. Status code: {error_response?.status}</span>
    ) : (
      <span></span>
    );

    return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Fitbit Data" />
        {error}
        <div>
          <h>Device Information</h>
        </div>
        <GridComponent
          width="auto"
          dataSource={this.state.devices_result}
          pageSettings={{ pageCount: 5 }}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          toolbar={toolbarOptions}
        >
          <ColumnsDirective>
            {this.state.devices_result?.map(({ battery, id, mac }) => (
              <li>
                <ul>
                  <li>device_battery : {battery}, </li>
                  <li>device_id : {id} ,</li>
                  <li>device_mac : {mac}</li>
                </ul>
              </li>
            ))}
          </ColumnsDirective>

          <Inject
            services={[
              Resize,
              Sort,
              ContextMenu,
              Filter,
              Page,
              ExcelExport,
              PdfExport,
              Toolbar,
            ]}
          />
        </GridComponent>

        <br />
        <br />
        <br />

        <div>
          <h>Distances Information</h>
        </div>
        <GridComponent
          width="auto"
          dataSource={
            this.state.activities_result.summary?.distances
              ? this.state.activities_result.summary?.distances
              : []
          }
          pageSettings={{ pageCount: 5 }}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          toolbar={toolbarOptions}
        >
          <Inject
            services={[
              Resize,
              Sort,
              ContextMenu,
              Filter,
              Page,
              ExcelExport,
              PdfExport,
              Toolbar,
            ]}
          />
        </GridComponent>

        <br />
        <br />
        <br />

        <div>
          <h>Exercise Information</h>
        </div>
        <GridComponent
          width="auto"
          dataSource={this.state.summary_array}
          pageSettings={{ pageCount: 5 }}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          toolbar={toolbarOptions}
        >
          <Inject
            services={[
              Resize,
              Sort,
              ContextMenu,
              Filter,
              Page,
              ExcelExport,
              PdfExport,
              Toolbar,
            ]}
          />
        </GridComponent>

        <br />
        <br />
        <br />

        <div>
          <h>IntraData</h>
        </div>
        <GridComponent
          width="auto"
          dataSource={this.state.intraday_result}
          pageSettings={{ pageCount: 5 }}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          toolbar={toolbarOptions}
        >
          <Inject
            services={[
              Resize,
              Sort,
              ContextMenu,
              Filter,
              Page,
              ExcelExport,
              PdfExport,
              Toolbar,
            ]}
          />
        </GridComponent>

        <br />
        <br />
        <br />

        <div>
          <h>weekly steps</h>
        </div>
        <GridComponent
          width="auto"
          dataSource={this.state.week_step_result}
          pageSettings={{ pageCount: 5 }}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          toolbar={toolbarOptions}
        >
          <Inject
            services={[
              Resize,
              Sort,
              ContextMenu,
              Filter,
              Page,
              ExcelExport,
              PdfExport,
              Toolbar,
            ]}
          />
        </GridComponent>

        <br />
        <br />
        <br />

        <div>
          <h>weekly distance</h>
        </div>
        <GridComponent
          width="auto"
          dataSource={this.state.week_distance_result}
          pageSettings={{ pageCount: 5 }}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          toolbar={toolbarOptions}
        >
          <Inject
            services={[
              Resize,
              Sort,
              ContextMenu,
              Filter,
              Page,
              ExcelExport,
              PdfExport,
              Toolbar,
            ]}
          />
        </GridComponent>

        <br />
        <br />
        <br />

        <div>
          <h>weekly calories</h>
        </div>
        <GridComponent
          width="auto"
          dataSource={this.state.week_calories_result}
          pageSettings={{ pageCount: 5 }}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          toolbar={toolbarOptions}
        >
          <Inject
            services={[
              Resize,
              Sort,
              ContextMenu,
              Filter,
              Page,
              ExcelExport,
              PdfExport,
              Toolbar,
            ]}
          />
        </GridComponent>
      </div>
    );
  }
}

export default FitbitSync;
