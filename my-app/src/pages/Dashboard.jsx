import { useRef, useState } from "react"

import { GoPrimitiveDot } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';
import { fitnessData, SparklineAreaData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
//grid layout
import GridLayout from "react-grid-layout";
import styled from "styled-components";
import useWindowDimensions from '../contexts/useWindowDimension';

import { pieChartData } from '../data/dummy';
import { Pie as PieChart } from '../components';
import { DataVisualization1, DataVisualization2, DataVisualization21, DataVisualization3, DataVisualization31, DataVisualization4, Nutrition } from '../pages';
import NeutriationDisplay from './nutriationDisplay'
import DailyBarGraph from './DailyBarGraph'
import DailySelfReport from './DailyselfReport'
const layout = [
  { i: "upLeft", x: 0, y: 0, w: 3, h: 4 },
  { i: "upMid", x: 3, y: 0, w: 3, h: 4 },
  { i: "upRight", x: 6, y: 0, w: 2, h: 4 },
  { i: "downLeft", x: 0, y: 4, w: 8, h: 4 },

]
const GridItemWrapper = styled.div`
  background: #f5f5f5;
`;

const GridItemContent = styled.div`
  padding: 8px;
`;

const Root = styled.div`
  padding: 16px;
`;

const Dashboard = () => {
  const { currentColor, screenSize } = useStateContext();
  const { height, width } = useWindowDimensions();
  const [switchStep, setSwitchStep] = useState(false);
  return (
    <>
      <div className="button" onClick={() => setSwitchStep(!switchStep)}>Switch {switchStep ? "Step" : "Miles"}</div>
      <div className="row">
        <div className="col-1"> {switchStep ? <DataVisualization3></DataVisualization3> : <DataVisualization31></DataVisualization31>}</div>
        <div className="col-5">      <NeutriationDisplay></NeutriationDisplay></div>
      </div>
      <div className="row">
        {switchStep ? <DataVisualization2></DataVisualization2> : <DataVisualization21></DataVisualization21>}
      </div>
   
    </>
  )
}

export default Dashboard;