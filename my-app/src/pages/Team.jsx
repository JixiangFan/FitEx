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

import { employeesData, employeesGrid } from "../data/dummy";
import { Header } from "../components";
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth } from "firebase/auth";

const toolbarOptions = ["Search"];

class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team_result: [],
    };
  }

  componentDidMount() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `team/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          //console.log(snapshot.val());
          const team_arr = Object.entries(snapshot.val()).map(
            ([key, value]) => {
              delete value["team_member"];
              delete value["contribution_percentage"];
              return value;
            }
          );
          console.log(team_arr);
          this.setState({
            team_result: team_arr,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="All Team" />
        <div>Team Detail List</div>

        <GridComponent
          width="auto"
          dataSource={this.state.team_result}
          pageSettings={{ pageCount: 5 }}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          toolbar={toolbarOptions}
        >
          <ColumnsDirective>
            <ColumnDirective field="team_name" headerText="team_name" />
            <ColumnDirective
              field="team_day_step_total"
              headerText="team_day_step_total"
            />
            <ColumnDirective
              field="team_day_goal"
              headerText="team_day_goal"
            />
            <ColumnDirective
              field="team_day_step_lift"
              headerText="team_day_step_lift"
            />
            <ColumnDirective
              field="team_day_rank"
              headerText="team_day_rank"
            />
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
      </div>
    );
  }
}
export default Team;