import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { getAuth } from "firebase/auth";
import { Navbar, Footer, Sidebar, ThemeSettings } from './components';

import { Participants, AllTeams, PhysicalActivity, DataVisualization1, DataVisualization2, DataVisualization21, DataVisualization3, DataVisualization31, DataVisualization32, DataVisualization33, DataVisualization4, Nutrition, CreateTeam, Dashboard, EmployeeTree, Task, KnowledgeBase, KnowledgeBase2, KnowledgeBase3, TeamMember, Login, Profile, FitbitSync, Team } from './pages';

import './App.css';
import Welcome from './pages/Welcome.jsx'
import { useStateContext } from './contexts/ContextProvider';
import { AuthProvider } from './contexts/AuthContext'
import ChangePassword from './pages/ChangePassword';
import Register1 from './pages/register_1'
import PrivateRoute from './components/Privateroutes';
import AuthRoute from './components/Authroutes';
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

    <AuthProvider>
      <BrowserRouter forceRefresh={true}>
        <div className="relative"> {/* root class div */}

          <div id="top" className="relative w-full ">
            <Navbar />
          </div>
          <div id="middle" className="relative w-full mt-10 pt-20">
            {user && <div id="side" className="sm:w-full lg:absolute lg:w-1/4">
              <div class="hidden lg:block accordion" id="accordionExample5">
                <div class="accordion-item bg-white border border-gray-200">
                  <h2 class="accordion-header mb-0" id="headingOne5">
                    <button class="
                      accordion-button
                      relative
                      flex
                      items-center
                      w-full
                      py-4
                      px-5
                      text-2xl text-gray-800 text-left
                      bg-white
                      border-0
                      rounded-none
                      transition
                      focus:outline-none     
      " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne5" aria-expanded="true"
                      aria-controls="collapseOne5">
                      Navigation
                    </button>
                  </h2>
                  <div id="collapseOne5" class="block accordion-collapse collapse show" aria-labelledby="headingOne5">
                    <Sidebar />
                  </div>
                </div>
              </div>

              <div class="lg:hidden accordion" id="accordionExample5">
                <div class="accordion-item bg-white border border-gray-200">
                  <h2 class="accordion-header mb-0" id="headingOne5">
                    <button class="
                      accordion-button
                      relative
                      flex
                      items-center
                      w-full
                      py-4
                      px-5
                      text-2xl text-gray-800 text-left
                      bg-white
                      border-0
                      rounded-none
                      transition
                      focus:outline-none
                      " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne5" aria-expanded="true"
                      aria-controls="collapseOne5">
                      Navigation
                    </button>
                  </h2>
                  <div id="collapseOne5" class="block accordion-collapse collapse" aria-labelledby="headingOne5">
                    <Sidebar />
                  </div>
                </div>
              </div>
            </div>}

            <div id="main" className="lg:absolute lg:right-0 lg:h-full lg:w-3/4 sm:w-full">
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
                  {/* <Route path="/team" element={(<Team />)} /> */}
                  <Route path="/allTeams" element={(<AllTeams />)} />
                  <Route path="/teamMember" element={<TeamMember />} />
                  <Route path="/updateProfile" element={<UpdateProfileLocal />} />
                  <Route path="/leaderboard" element={<LeadBoard />} />
                  <Route path="/dailyBarGraph" element={<DailyBarGraph />} />
                  <Route path="/dailySelfReport" element={<DailySelfReport />} />
                  <Route path="/NeutriationDisplay" element={<NeutriationDisplay />} />
                  <Route path="/knowledgeBase" element={<KnowledgeBase />} />
                  <Route path="/knowledgeBase2" element={<KnowledgeBase2 />} />
                  <Route path="/knowledgeBase3" element={<KnowledgeBase3 />} />
                  {/* <Route path="/employeeTree" element={<EmployeeTree />} /> */}
                  <Route path="/participants" element={<Participants />} />
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
  )
}

export default App