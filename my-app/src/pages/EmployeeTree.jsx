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

var access_token = "";
var uid = "";
var u_name = "";

const toolbarOptions = ['Search', 'Edit', 'Cancel'];

const permission_Level = {
  0: "Member",
  1: "Leader",
  2: "Agent",
  3: "Admin",
};

class EmployeeTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participants_result: {},
      participants_data: {}
    };
    this.editOptions = { allowEditing: true };
    this.ddParams = { params: { value: 'Germany' } };
  }

  componentDidMount() {
    const auth = getAuth();
    const user = auth.currentUser;
    //console.log(user);
    const dbRef = ref(getDatabase());
    get(child(dbRef, `profile/`))
      .then((snapshot) => {
        get(child(dbRef, `team/`)).then((snapshot2) => {
          if (snapshot2.exists())
          {
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

          if (snapshot.exists())
          {
            //console.log(snapshot.val());
            const participants_arr = Object.entries(snapshot.val()).map(
              ([key, value]) => {
                value.usertype = permission_Level[value.usertype];
                var returnObj = {
                  'Name': value['displayname'],
                  'Age': value['age'],
                  'Email': value['email'],
                  'Gender': value['gender'],
                  'Height': value['height'],
                  'Weight': value['weight'],
                  'User Type': value['usertype'],
                  'Step Goal': value['stepGoal'],
                  'Food Goal': value['foodGoal'],
                  'Report type': value['device']
                }
                return returnObj;
              }
            );
            //console.log(participants_arr);
            this.setState({
              participants_result: participants_arr,
              participants_data: snapshot.val()
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
        <Header category="Page" title="All Participants" />

        <div>
          <h>Participants Information</h>
        </div>
        <GridComponent
          width="75%"
          dataSource={this.state.participants_result}
          pageSettings={{ pageCount: 5 }}
          editSettings={this.editOptions}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          toolbar={toolbarOptions}
        >
           {/* 'Name': value['displayname'],
                  'Age': value['age'],
                  'Email': value['email'],
                  'Gender': value['gender'],
                  'Height': value['height'],
                  'Weight': value['weight'],
                  'User Type': value['usertype'],
                  'Step Goal': value['stepGoal'],
                  'Food Goal': value['foodGoal'],
                  'Report type': value['device'] */}
          <ColumnsDirective>
            <ColumnDirective field='Name' headerText='Name' />
            <ColumnDirective field='Email' headerText='Email' />
            <ColumnDirective field='Gender' headerText='Gender' />
            <ColumnDirective field='Height' headerText='Height' />
            <ColumnDirective field='Weight' headerText='Weight'/>
            <ColumnDirective field='User Type' headerText='User Type' editType='dropdownedit' edit={this.ddParams} width='150' />
            <ColumnDirective field='Step Goal' headerText='Step Goal' />
            <ColumnDirective field='Food Goal' headerText='Food Goal' />
            <ColumnDirective field='Report type' headerText='Report type'/>
          </ColumnsDirective>
          <Inject
            services={[
              Edit,
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
export default EmployeeTree;
