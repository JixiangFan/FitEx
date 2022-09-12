/**
 * Sample for Category Axis
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, DataLabel, Legend, Tooltip, BarSeries, Category } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { fabricColors, materialColors, bootstrapColors, highContrastColors, fluentColors, fluentDarkColors } from './theme-color';
import { SampleBase } from '../common/sample-base';
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

export let pointRender = (args) => {
    let selectedTheme = window.location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1)
    {
        args.fill = fabricColors[args.point.index % 10];
    }
    else if (selectedTheme === 'material')
    {
        args.fill = materialColors[args.point.index % 10];
    }
    else if (selectedTheme === 'highcontrast')
    {
        args.fill = highContrastColors[args.point.index % 10];
    }
    else if (selectedTheme === 'fluent')
    {
        args.fill = fluentColors[args.point.index % 10];
    }
    else if (selectedTheme === 'fluent-dark')
    {
        args.fill = fluentDarkColors[args.point.index % 10];
    }
    else
    {
        args.fill = bootstrapColors[args.point.index % 10];
    }
};
export let data = [
    { x: 'Germany', y: 72, country: 'GER: 72' },
    { x: 'Russia', y: 103.1, country: 'RUS: 103.1' },
    { x: 'Brazil', y: 139.1, country: 'BRZ: 139.1' },
    { x: 'India', y: 462.1, country: 'IND: 462.1' },
    { x: 'China', y: 721.4, country: 'CHN: 721.4' },
    { x: 'United States<br>Of America', y: 286.9, country: 'USA: 286.9' },
    { x: 'Great Britain', y: 115.1, country: 'GBR: 115.1' },
    { x: 'Nigeria', y: 97.2, country: 'NGR: 97.2' },
];
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;
/**
 * Category sample
 */
export default class DailySelfReport extends SampleBase {

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
                    if (snapshot.val()["SelfReportData"])
                    {
                        const sourceData = snapshot.val()["SelfReportData"]
                        const day = Object.keys(sourceData)[Object.keys(sourceData).length - 1]
                        if (day > startOfWeekTime)
                        {
                           
                            var data = sourceData[Object.keys(sourceData)[Object.keys(sourceData).length - 1]].activity
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
                <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{
                    title: 'Self Report Exercise',
                    valueType: 'Category',
                    majorGridLines: { width: 0 },
                    enableTrim: false,
                }} primaryYAxis={{
                    minimum: 0,
                    maximum: 5,
                    labelFormat: Browser.isDevice ? '{value}' : '{value} hour',
                    edgeLabelPlacement: 'Shift',
                    majorGridLines: { width: 0 },
                    majorTickLines: { width: 0 },
                    lineStyle: { width: 0 },
                    labelStyle: {
                        color: 'transparent'
                    }
                }} load={this.load.bind(this)} width={Browser.isDevice ? '100%' : '60%'} chartArea={{ border: { width: 0 } }} legendSettings={{ visible: false }} title={"Self Report Exercise"} pointRender={pointRender} loaded={this.onChartLoad.bind(this)} tooltip={{ enable: true, format: '${point.tooltip}' }}>
                    <Inject services={[BarSeries, Legend, Tooltip, DataLabel, Category]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={this.state.chartData} xName='des' yName='time' type='Bar' width={2} tooltipMappingName='res_step' marker={{
                            dataLabel: {
                                visible: true,
                                position: 'Top', font: {
                                    fontWeight: '600',
                                    color: '#ffffff'
                                }
                            }
                        }} name='Step'>
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