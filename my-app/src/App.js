import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { getAuth } from "firebase/auth";
import { Navbar, Footer, Sidebar, ThemeSettings } from './components';

import { Nutrition, CreateTeam, RegisterProfile, Calendar, Dashboard, DataAnalytics, EmployeeTree, Task, Kanban, Editor, KnowledgeBase, TeamMember, Login, Profile, Register, Competition, Award, FitbitSync, MET, Stacked, Pyramid, Line, Area, Bar, Pie, ColorMapping, Team, Notification } from './pages';

import './App.css';
import Welcome from './pages/Welcome.jsx'
import { useStateContext } from './contexts/ContextProvider';
import { AuthProvider } from './contexts/AuthContext'


const App = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const { activeMenu, themeSettings, setThemeSettings, currentColor } = useStateContext();
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <div className="flex relative dark:bg-main-dark-bg">

            <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
              <TooltipComponent
                content="Settings" position="Top">
                <button type="button"
                  className="text-3xl p-3 
                          hover:drop-shadow-xl 
                          hover:bg-light-gray text-white"
                  onClick={() => setThemeSettings(true)}
                  style={{ background: currentColor, borderRadius: '50%' }}
                >
                  <FiSettings />
                </button>
              </TooltipComponent>
            </div>

            {/* Active Menu control */}
            {activeMenu ? (
              <div className="w-72 fixed sidebar 
                            dark:bg-secondary-dark-bg 
                            bg-white">
                <Sidebar />
              </div>
            ) : (
              <div className="w-0 
                            dark:bg-secondary-dark-bg">
                <Sidebar />
              </div>
            )}

            <div className={
                activeMenu
                  ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                  : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
              }
            >
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar />
              </div>

              {user
                ?<div>
                {themeSettings && (<ThemeSettings />)}

                <Routes>
                  {/*Dashboard*/}

                  <Route path="/" element={(<Dashboard />)} />
                  <Route path="/dashboard" element={(<Dashboard />)} />

                  <Route path="/competition" element={<Competition />} />
                  <Route path="/award" element={<Award />} />
                  <Route path="/team" element={(<Team />)} />
                  <Route path="/teamMember" element={<TeamMember />} />
                  <Route path="/employeeTree" element={<EmployeeTree />} />

                  {/* pages  */}
                  <Route path="/MET" element={<MET />} />
                  <Route path="/nutrition" element={<Nutrition />} />
                  <Route path="/fitbitSync" element={<FitbitSync />} />
                  <Route path="/task" element={<Task />} />

                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/registerprofile" element={<RegisterProfile />} />
                  <Route path="/createTeam" element={<CreateTeam />} />
                  {/* <Route path="/update" element={<RegisterQuestion />} /> */}






                </Routes>
              </div>
                :
                <Routes>
                  <Route path="/" element={(<Welcome />)} />
                </Routes>
              }

              
            </div>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App