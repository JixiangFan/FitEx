import React from "react";
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

import { Header } from "../components";
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth } from "firebase/auth";

const toolbarOptions = [`PdfExport`, `ExcelExport`, `CsvExport`, "Search"];

const permission_Level = {
  0: "Member",
  1: "Leader",
  2: "Agent",
  3: "Admin",
};

class TeamMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team_result: [],
      participants_result: {},
      // profile: {},
    };
  }

  componentDidMount() {
    const auth = getAuth();
    const user = auth.currentUser;
    //console.log(user);
    const userId = user.uid;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `profile/`))
      .then((snapshot) => {
        get(child(dbRef, `team/`)).then((snapshot2) => {
          if (snapshot2.exists()) {
            //console.log(snapshot.val());
            const team_obj = {};
            Object.entries(snapshot2.val()).forEach(([key, value]) => {
              team_obj[key] = value.team_name;
            });
            //console.log(team_obj);
            this.setState({
              team_result: team_obj,
            });
          }

          if (snapshot.exists()) {
            //console.log(snapshot.val());
            // this.setState({
            //   profile: snapshot,
            // });
            const userProfile = snapshot.val()[userId];
            const teamId = userProfile.team;
            const participants_arr = Object.entries(snapshot.val()).map(
              ([key, value]) => {
                value.usertype = permission_Level[value.usertype];
                delete value["fitbitToken"];
                return value;
              }
            );
            const teamUserProfiles = participants_arr.filter(
              (x) => x.team == teamId
            );
            const updateTeamName = Object.entries(teamUserProfiles).map(
              ([key, value]) => {
                value.team = this.state.team_result[value.team];
                return value;
              }
            );
            this.setState({
              participants_result: updateTeamName,
            });
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Fitbit Data" />

        <div>
          <h>Exercise Information</h>
        </div>
        <GridComponent
          width="auto"
          dataSource={this.state.participants_result}
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

export default TeamMember;