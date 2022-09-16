/**
 * Sample for Line Series
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip } from '@syncfusion/ej2-react-charts';
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import Cup from "../components/cup"


export default class NeutriationDisplay extends React.Component {

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
                     
                    if (snapshot.val()["NutritionData"])
                    {
                        const sourceData = snapshot.val()["NutritionData"]
                        const day = Object.keys(sourceData)[Object.keys(sourceData).length - 1]
                        if (day > startOfWeekTime)
                        {
                            var today = new Date();
                            var dd = String(today.getDate()).padStart(2, '0');
                            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                            var yyyy = today.getFullYear();
                            today = yyyy + "-" + mm + "-" + dd + "T";
                            var data = sourceData[Object.keys(sourceData)[Object.keys(sourceData).length - 1]].nutrition.fv
                            this.setState({
                                chartData: data
                            });
                        }

                    }
                } else
                {
                    this.setState({
                        chartData: 0
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }




    render() {
        var outputString = this.state.chartData + "/35 cup"
        return (
            <>
           
                <Cup message={outputString}></Cup>
                  
            </>
        )
    }
}