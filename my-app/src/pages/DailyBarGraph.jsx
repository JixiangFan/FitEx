/**
 * Sample for Line Series
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
export let data1 = [
    { x: new Date(2005, 0, 1), y: 21 }, { x: new Date(2006, 0, 1), y: 24 },
    { x: new Date(2007, 0, 1), y: 36 }, { x: new Date(2008, 0, 1), y: 38 },
    { x: new Date(2009, 0, 1), y: 54 }, { x: new Date(2010, 0, 1), y: 57 },
    { x: new Date(2011, 0, 1), y: 70 }
];
export let data2 = [
    { x: new Date(2005, 0, 1), y: 28 }, { x: new Date(2006, 0, 1), y: 44 },
    { x: new Date(2007, 0, 1), y: 48 }, { x: new Date(2008, 0, 1), y: 50 },
    { x: new Date(2009, 0, 1), y: 66 }, { x: new Date(2010, 0, 1), y: 78 }, { x: new Date(2011, 0, 1), y: 84 }
];
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }
         .charts {
             align :center
         }`;
export default class DailyBarGraph extends SampleBase {

    constructor(props) {
        super(props);
        this.state = {
            chartData: []
        };
    }
    componentDidMount() {
        const auth = getAuth();
        const user = auth.currentUser;
        const uid = user["uid"];
        var curr = new Date();
        var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
        //console.log(firstday);
        var startOfWeek = firstday.toISOString().split("T")[0];
        //console.log(startOfWeek);
        const startOfWeekTime = new Date(startOfWeek).getTime();

        const dbRef = ref(getDatabase());
        //console.log(dbRef);
        get(child(dbRef, `FitEx/User/${uid}`))
            .then((snapshot) => {
                if (snapshot.exists())
                {
                    if (snapshot.val()["FitData"])
                    {
                        const sourceData = snapshot.val()["FitData"]
                        const day = Object.keys(sourceData)[Object.keys(sourceData).length - 1]
                        if (day > startOfWeekTime)
                        {
                            var today = new Date();
                            var dd = String(today.getDate()).padStart(2, '0');
                            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                            var yyyy = today.getFullYear();
                            today = yyyy+"-"+mm+"-"+dd+"T";
                            var data = sourceData[Object.keys(sourceData)[Object.keys(sourceData).length - 1]].intraday
                            Object.keys(data).forEach(function (key, index) {
                                data[key].time = new Date(today+data[key].time);
                            });
                            this.setState({
                                chartData: data
                            });
                        }

                    }
                } else
                {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }




    render() {
        return (<div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <ChartComponent id='fiveGraph' style={{ textAlign: "center" }} primaryXAxis={{
                    valueType: 'DateTime',
                    labelFormat: 'hh:mm:ss',
                    range: { 
                        interval: 15,
                    },  
                    intervalType: 'Minutes',
                    edgeLabelPlacement: 'Shift',
                    majorGridLines: { width: 0 }
                }} load={this.load.bind(this)} primaryYAxis={{
                    labelFormat: 'n1',
                    rangePadding: 'None',
                    minimum: 0,
                    maximum: 5000,
                    interval: 500,
                    lineStyle: { width: 0 },
                    majorTickLines: { width: 0 },
                    minorTickLines: { width: 0 }
                }} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true }} width={Browser.isDevice ? '100%' : '60%'} title='Your current progress' loaded={this.onChartLoad.bind(this)}>
                    <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={this.state.chartData} xName='time' yName='value' name='daily steps' width={2} marker={{ visible: true, width: 10, height: 10 }} type='Line'>
                        </SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
        </div>);
    }
    onChartLoad(args) {
        let chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    }
    ;
    load(args) {
        let selectedTheme = window.location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    }
    ;
}