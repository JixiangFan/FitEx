import { async } from "@firebase/util";
import React from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth } from "firebase/auth";
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
import writeDeviceData from "../components/Firebase/writeDeviceData";

const toolbarOptions = [`PdfExport`, `ExcelExport`, `CsvExport`, "Search"];
var access_token = "";
var uid = "";
var u_name = "";

var curr = new Date();
var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));
var startOfWeek = firstday.toISOString().split("T")[0];
var lastofWeek = lastday.toISOString().split("T")[0];
//console.log(startOfWeek);
//console.log(lastofWeek);


class FitbitSync extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      week_calories_result: [],
    };
  }

  toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i) rv[i] = arr[i];
    return rv;
  }

  componentDidMount() {
    const auth = getAuth();
    const user = auth.currentUser;
    //console.log(user);
    uid = user.uid;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `profile/${user["uid"]}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          u_name = snapshot.val().displayname;
          access_token = snapshot.val().fitbitToken;
          fetch(
            `https://api.fitbit.com/1/user/-/activities/calories/date/${startOfWeek}/${lastofWeek}.json`,
            //1/user/-/activities/distance/date/2022-09-10/1w.json",
            //1/user/-/activities/date/2022-09-01.json",
            //1/user/-/activities/distance/date/today/1w.json",
            //1/user/-/activities/date/2022-09-01.json",
            //1/activities.json",
            ///user/-/activities/list.json?afterDate=2022-08-01&sort=asc&offset=0&limit=100",
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

            .then((weekly_d) => {
              //const summary_array = result["activities-steps-intraday"].dataset;
              console.log(weekly_d);
              const week_array_c = weekly_d["activities-calories"];
              this.setState({
                week_calories_result: week_array_c,
              });
              //console.log(this.state.week_calories_result);
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
        <Header category="Page" title="Intraday Data" />
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
