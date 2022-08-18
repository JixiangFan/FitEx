import { push } from 'firebase/database';
import React from 'react'
import writeDeviceData from '../components/Firebase/writeDeviceData'
import setUserData from '../components/Firebase/writeActivityData'
import { Header } from '../components';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Selection, Filter, Page, ExcelExport, PdfExport, Edit, Inject,Toolbar } from '@syncfusion/ej2-react-grids';


const access_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzhLM1giLCJzdWIiOiJCNFRaSFciLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd3NvYyB3YWN0IHdveHkgd3RlbSB3d2VpIHdzZXQgd2xvYyB3cmVzIiwiZXhwIjoxNjYyMjQxNjIxLCJpYXQiOjE2NTk2NDk2NDh9.B8OFnUhV2YqUuWFO9oZ8zvtglLlpssaXEpAtnMfCDR0"
const toolbarOptions = [`PdfExport`,`ExcelExport`, `CsvExport`, 'Search'];

class FitbitSync extends React.Component{
  constructor(props){
    super(props)
    this.state={
      result : []
    }
  }

  toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
      rv[i] = arr[i];
    return rv;
  }

  //device api
  componentDidMount(){
    
    fetch('https://api.fitbit.com/1/user/-/devices.json',{
      method:'GET',
      headers:{
        "Authorization": "Bearer " + access_token
      },
    })
      .then(response => response.json()) 
      .then(devices => {
       
        //activity api
          fetch('https://api.fitbit.com//1/user/-/activities/goals/weekly.json',{
          method:'GET',
          headers:{
            "Authorization": "Bearer " + access_token
          },
          })
          .then(response => response.json()) 
          .then(activities => {
            
            // console.log(activities) 
            // writeActivityData("Bruce", "bb001", "jfan12@gmail.com", activities) 
            
            //console.log(this.toObject(temp[0])) 
            writeDeviceData("Bruce", "bb001", "jfan12@gmail.com", activities, this.toObject(devices))
          } 
          ); 
        //console.log(json)  
        //返的直接是parse处理过的object，不需要parse
        //const device_information = {};
        //for(let i = 0; i < devices.length; i++){
        //  const device = devices[0]
          //const device_battery = device.battery   //device["battery"]
          //const device_id = device.id
          //const device_mac = device.mac

          //device_information[i] = 
          //{
          //  device_battery : device.battery,
          //  device_id : device.id,
          //  device_mac : device.mac
          //}
          
        //  }
        //console.log(devices) 
        // writeDeviceData("Bruce", "bb001", "jfan12@gmail.com", devices) //globa variable for login information  
        // this.setState({
        //     result : devices
        // })
      } 
      ); 

     


      //console.log(temp) 
      // const empty = [];
      // empty[0] = 0;
      // empty[1] = 1;
      // setUserData("Bruce", "bb001", "jfan12@gmail.com", empty[1], empty[0])
      

      
     
      //console.log(this.toObject(temp[1])) 

      //writeDeviceData("Bruce", "bb001", "jfan12@gmail.com", return_activity, return_device)
      
      

  }




  
  render(){
    return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Fitbit Data" />
      <GridComponent
      width="auto"
      dataSource={this.state.result}
      pageSettings={{ pageCount: 5 }}
      allowPaging
      allowSorting
      allowExcelExport
      allowPdfExport
      toolbar={toolbarOptions}
      >
        <ColumnsDirective>    
          {
            this.state.result.map(({battery, id, mac}) => (
              <li> 
                <ul>
                   <li>device_battery : {battery}, </li> 
                   <li>device_id : {id} ,</li>
                   <li>device_mac : {mac}</li> 
                </ul>  
              </li>
              
            ))} 
        </ColumnsDirective>

        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Toolbar]} />
      </GridComponent>

      </div>
    )
  }
  

}

export default FitbitSync

