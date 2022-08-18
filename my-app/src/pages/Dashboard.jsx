import React from 'react';

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


const layout = [
  { i: "upLeft", x: 0, y: 0, w: 2, h: 5 },
  { i: "upRight", x: 3, y: 0, w: 6, h: 7 },
  { i: "downLeft", x: 0, y: 3, w: 4, h: 10 },
  { i: "downright", x: 4, y: 3, w: 4, h: 10 },
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
  
  return (
    <Root>
      <GridLayout layout={layout} cols={8} rowHeight={50} width={(width+1000)/2}>
        <GridItemWrapper key="upLeft">
          <GridItemContent>
          <div className="flex flex-wrap lg:flex-nowrap justify-center ">        
          <div className="bg-white
                          dark:text-gray-200
                          dark:bg-secondary-dark-bg h-44 
                          rounded-xl w-full lg:w-80 p-8 pt-9 m-3 
                          bg-hero-pattern bg-no-repeat bg-cover bg-center">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold">Total Walking Steps</p>             
                <p className="text-2xl">91154</p>
              </div>
            </div>
          
            <div className="mt-2">
            <Button
              color="white"
              bgColor={currentColor}
              text="Download Individual Weely Report"
              borderRadius="10px"/>
            </div>
          </div>
          </div>
          
          </GridItemContent>
        </GridItemWrapper>
        <GridItemWrapper key="upRight">
          <GridItemContent><div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {fitnessData.map((item) => (
            <div key={item.title} 
              className="bg-white
                         dark:text-gray-200
                         dark:bg-secondary-dark-bg md:w-56 
                          p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                style={{ color: item.iconColor, 
                         backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl">
                {item.icon}
              </button>
              
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.step}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage} {item.rank}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
         
        </div>
        </GridItemContent>
        </GridItemWrapper>


        <GridItemWrapper key="downLeft">
          <GridItemContent>

          <div  className="flex gap-10 flex-wrap justify-center">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
            <div className="flex justify-between">
              <p className="font-semibold text-xl">Team Task Contribution</p>
              </div>
            



         
          <div className="w-full">
            <PieChart id="chart-pie" data={pieChartData} legendVisiblity height="full" />
          </div>
        </div>
        </div>


        </GridItemContent>
        </GridItemWrapper>


        <GridItemWrapper key="downright">
          <GridItemContent>
        <div  className="flex gap-10 flex-wrap justify-center">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
            <div className="flex justify-between">
              <p className="font-semibold text-xl">Personal Task Updates</p>
              <div className="flex items-center gap-4">
                <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                  <span>
                    <GoPrimitiveDot />
                  </span>
                  <span>Individual Goal</span>
                </p>
                <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>Individual Progress</span>
              </p>
              </div>
            </div>
            
            <div className="mt-10 flex gap-10 flex-wrap justify-center">
              <div className=" border-r-1 border-color m-4 pr-10">
                <div>
                  <p>
                    <span className="text-3xl font-semibold">23384</span>
                    <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                      23%
                    </span>
                  </p>
                  <p className="text-gray-500 mt-1">Individual Progress Steps</p>
                </div>

                <div className="mt-8">
                  <p>
                    <span className="text-3xl font-semibold">80000</span>
                  </p>
                  <p className="text-gray-500 mt-1">Individual Goal Steps</p>
                </div>

                <div className="mt-5">
                  <SparkLine 
                  currentColor={currentColor}
                  id="line-sparkLine" 
                  type="Line" 
                  height="80px" 
                  width="250px" 
                  data={SparklineAreaData} 
                  color={currentColor}  />
                </div>
                <div className="mt-10">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Download Individual Progress Report"
                  borderRadius="10px"
                />
              </div>
            </div>

            <div>
              <Stacked width="320px" height="360px" />
            </div>

            </div>
          </div>
        </div>
        </GridItemContent>
        </GridItemWrapper>
      </GridLayout>
    </Root>
  )
}

export default Dashboard;