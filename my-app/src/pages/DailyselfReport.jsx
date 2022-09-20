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
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        const local_morning = date.getTime();
        //console.log(date.toISOString().split("T")[0]);
        //console.log(local_morning);
        const dbRef = ref(getDatabase());
        //console.log(dbRef);
        get(child(dbRef, `FitEx/User/${uid}`))
            .then((snapshot) => {
                if (snapshot.exists())
                {
                    const selfReportData = snapshot.val()["SelfReportData"];
                    let userData4 = [];

                    if (selfReportData)
                    {
                        const lastSelfReportTime = Object.keys(selfReportData).filter(
                            (x) => {
                                //这里需要考虑
                                //1.没有上传sync，lastSyncTime是昨天的数据情况
                                //2.移除上周数据
                                if (x < startOfWeekTime || x - local_morning < 0)
                                    return false;
                                //console.log(x - local_morning);
                                return x;
                            }
                        );
                        console.log(lastSelfReportTime);

                        lastSelfReportTime.forEach((time) => {
                            const data = selfReportData[time];
                            console.log(data);

                            var temp_data = selfReportData[time]["activity"];
                            temp_data[0]["cal"] = temp_data[0]["time"]/60
                            userData4.push(temp_data[0])
                        })
                        this.setState(
                            {
                                chartData: userData4
                            }
                        )
                    }
                }
                else
                {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }




    render() {
        console.log(this.state.chartData)
        return (
          <div className="control-pane">
            <style>{SAMPLE_CSS}</style>
            <div className="control-section">
              <ChartComponent
                id="charts"
                style={{ textAlign: "center" }}
                primaryXAxis={{
                  title: "Physical Activities",
                  valueType: "Category",
                  majorGridLines: { width: 0 },
                  enableTrim: false,
                }}
                primaryYAxis={{
                  minimum: 0,
                  maximum: 6,
                  labelFormat: "{value} hour",
                  edgeLabelPlacement: "Shift",
                  majorGridLines: { width: 0 },
                  majorTickLines: { width: 0 },
                  lineStyle: { width: 0 },
                  labelStyle: {
                    color: "transparent",
                  },
                }}
                load={this.load.bind(this)}
                width={Browser.isDevice ? "100%" : "60%"}
                chartArea={{ border: { width: 0 } }}
                legendSettings={{ visible: false }}
                title={
                  "Daily Self Report Physical Activity Summarization"
                }
                pointRender={pointRender}
                loaded={this.onChartLoad.bind(this)}
                tooltip={{ enable: true, format: "${point.tooltip}" }}
              >
                <Inject
                  services={[
                    BarSeries,
                    Legend,
                    Tooltip,
                    DataLabel,
                    Category,
                  ]}
                />
                <SeriesCollectionDirective>
                  <SeriesDirective
                    dataSource={this.state.chartData}
                    xName="des"
                    yName="cal"
                    type="Bar"
                    width={2}
                    tooltipMappingName="res_step"
                    marker={{
                      dataLabel: {
                        visible: true,
                        position: "Top",
                        font: {
                          fontWeight: "600",
                          color: "#ffffff",
                        },
                      },
                    }}
                    name="Step"
                  />
                </SeriesCollectionDirective>
              </ChartComponent>
            </div>
          </div>
        );
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