import { async } from "@firebase/util";
import React from "react";

const access_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzhLM1giLCJzdWIiOiJCNFRaSFciLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd3NvYyB3YWN0IHdveHkgd3RlbSB3d2VpIHdzZXQgd2xvYyB3cmVzIiwiZXhwIjoxNjYyMjQxNjIxLCJpYXQiOjE2NTk2NDk2NDh9.B8OFnUhV2YqUuWFO9oZ8zvtglLlpssaXEpAtnMfCDR0";
//"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzhRU1ciLCJzdWIiOiJCMjk0UTIiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd251dCB3cHJvIHdzbGUgd3NvYyB3YWN0IHdveHkgd3RlbSB3d2VpIHdzZXQgd3JlcyB3bG9jIiwiZXhwIjoxNjYyNDk0OTQ3LCJpYXQiOjE2NjE4OTAxNDd9.YYuraCQd1oVj6q1Qd_fMAGr_1q9i4PqF8LUdK4mVZNs;"

class FitbitSync extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devices_result: [],
    };
  }

  //device api
  componentDidMount() {
    fetch(
      "https://api.fitbit.com/1/user/-/activities/distance/date/2022-09-10/1w.json",
      //1/user/-/activities/date/2022-09-01.json",
      //1/user/-/activities/distance/date/today/1w.json",
      //1/user/-/activities/goals/weekly.json",
      //1/user/-/activities/date/2022-09-01.json",
      //1/activities.json",
      ///user/-/activities/list.json?afterDate=2022-08-01&sort=asc&offset=0&limit=100",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    ).then((result) => {
      console.log(result);
      //activity api
      this.setState({
        devices_result: result,
      });
    });
  }

  render() {
    return <div>test</div>;
  }
}

export default FitbitSync;
