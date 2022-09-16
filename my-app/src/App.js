import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { getAuth } from "firebase/auth";
import { Navbar, Footer, Sidebar, ThemeSettings } from './components';

import { PhysicalActivity, DataVisualization1, DataVisualization2, DataVisualization21, DataVisualization3, DataVisualization31, DataVisualization32, DataVisualization33,DataVisualization4, Nutrition, CreateTeam, RegisterProfile, Calendar, Dashboard, DataAnalytics, EmployeeTree, Task, Kanban, Editor, KnowledgeBase,KnowledgeBase2, KnowledgeBase3,TeamMember, Login, Profile, Register, Competition, Award, FitbitSync, MET, Stacked, Pyramid, Line, Area, Bar, Pie, ColorMapping, Team, Notification } from './pages';

import './App.css';
import Welcome from './pages/Welcome.jsx'
import { useStateContext } from './contexts/ContextProvider';
import { AuthProvider } from './contexts/AuthContext'
import ChangePassword from './pages/ChangePassword';
import Register1 from './pages/register_1'
import PrivateRoute from './components/Privateroutes';
import Register2 from './pages/register_2';
import Register3 from './pages/register_3';
import Reminder from './pages/reminder';
import Leaderboard from './pages/leaderboard';
import Leaderboard2 from './pages/leaderboard2';
import DailyBarGraph from './pages/DailyBarGraph'
import DailySelfReport from './pages/DailyselfReport'
import NeutriationDisplay from './pages/nutriationDisplay'
import LeadBoard from './pages/Leadboard'
import UpdateProfileLocal from './pages/updateProfile';
const App = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const { activeMenu, themeSettings, setThemeSettings, currentColor } = useStateContext();
  return (
    <div>
      <AuthProvider>
        <BrowserRouter forceRefresh={true}>
          <div className="flex relative dark:bg-main-dark-bg">
            {user &&
              <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                <TooltipComponent
                  content="Settings" position="Top">
                  {/* <button type="button"
                    className="text-3xl p-3 
                          hover:drop-shadow-xl 
                          hover:bg-light-gray text-white"
                    onClick={() => setThemeSettings(true)}
                    style={{ background: currentColor, borderRadius: '50%' }}
                  >
                    <FiSettings />
                  </button> */}
                </TooltipComponent>
              </div>
            }

            {user && <div id="side" className="fixed sidebar 
                            dark:bg-secondary-dark-bg 
                            bg-white">
              <Sidebar />
            </div>}



            <div className={
              activeMenu && user
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
            >
              <div id="top" className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar />
              </div>




              <div className="w-full pl-10 h-full">
                {themeSettings && (<ThemeSettings />)}

                <Routes>
                  {/*Dashboard*/}

                  {user ? <><Route path="/" element={(<Dashboard />)} />
                    <Route path="*" element={(<Dashboard />)} /></>
                    :
                    <>
                      <Route path="/" element={(<Welcome />)} />
                      <Route path="*" element={<Login />} />
                    </>
                  }


                  <Route exact path='/' element={<PrivateRoute />}>
                    <Route exact path="/dashboard" element={(<Dashboard />)} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/register2" element={<Register2 />} />
                    <Route path="/register3" element={<Register3 />} />
                    <Route path="/createTeam" element={<CreateTeam />} />
                    <Route path="/reminder" element={<Reminder />} />
                    {/* pages  */}
                    <Route path="/MET" element={<MET />} />
                    <Route path="/nutrition" element={<Nutrition />} />
                    <Route path="/fitbitSync" element={<FitbitSync />} />
                    <Route path="/task" element={<Task />} />
                    <Route path="/MET" element={<MET />} />
                    <Route path="/physicalActivity" element={<PhysicalActivity />} />
                    <Route path="/nutrition" element={<Nutrition />} />
                    <Route path="/fitbitSync" element={<FitbitSync />} />
                    <Route path="/task" element={<Task />} />
                    <Route path="/dataVisualization1" element={<DataVisualization1 />} />
                    <Route path="/dataVisualization2" element={<DataVisualization2 />} />

                    <Route path="/dataVisualization21" element={<DataVisualization21 />} />
                    <Route path="/dataVisualization3" element={<DataVisualization3 />} />
                    <Route path="/dataVisualization31" element={<DataVisualization31 />} />
                    <Route path="/dataVisualization32" element={<DataVisualization32 />} />
                    <Route path="/dataVisualization33" element={<DataVisualization33 />} />
                    <Route path="/dataVisualization4" element={<DataVisualization4 />} />
                    <Route path="/employeeTree" element={<EmployeeTree />} />
                    <Route path="/team" element={(<Team />)} />
                    <Route path="/teamMember" element={<TeamMember />} />
                    <Route path="/updateProfile" element={<UpdateProfileLocal/>} />
                    <Route path="/leaderboard" element={<LeadBoard />} />
                    <Route path="/teamMember" element={<TeamMember />} />
                    <Route path="/employeeTree" element={<EmployeeTree />} />
                    <Route path="/dailyBarGraph" element={<DailyBarGraph />} />
                    <Route path="/dailySelfReport" element={<DailySelfReport />} />
                    <Route path="/NeutriationDisplay" element={<NeutriationDisplay/>}/>
                    <Route path="/knowledgeBase" element={<KnowledgeBase />} />
                    <Route path="/knowledgeBase2" element={<KnowledgeBase2 />} />
                    <Route path="/knowledgeBase3" element={<KnowledgeBase3 />} />
                  </Route>
                  <Route path="/register" element={<Register1 />} />
                  <Route path="/login" element={<Login />} />
                  
                  <Route path="/forgetpassword" element={<ChangePassword />} />
                  {/* 
                    <Route path="/competition" element={<Competition />} />
                    <Route path="/award" element={<Award />} />
                    <Route path="/team" element={(<Team />)} />
                    <Route path="/teamMember" element={<TeamMember />} />
                    <Route path="/employeeTree" element={<EmployeeTree />} /> */}

                  {/* pages  */}

                  {/* <Route path="/update" element={<RegisterQuestion />} /> */}
                </Routes>
              </div>




            </div>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App