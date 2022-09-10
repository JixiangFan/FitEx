import React, { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useNavigate } from "react-router-dom"
import avatar from '../data/avatar.jpg';
import { Chat, Notification, UserProfile } from '.';
import { Register, Login } from '../pages'
import { useStateContext } from '../contexts/ContextProvider';
import { useAuth } from '../contexts/AuthContext'

const NavButton = ({ title, customFunc, icon, color, dotcolor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotcolor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);



const Navbar = () => {
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900)
    {
      setActiveMenu(false);
    } else
    {
      setActiveMenu(true);
    }
  }, [screenSize])




  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate();
  async function handleLogout() {
    setError("")

    try
    {
      await logout()
    } catch {
      setError("Failed to log out")
    }
  }

  const navigateToprofile = () => {
    navigate('/profile');
  };



  return (
    <div>
      {currentUser
       &&
        <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
          <>
            <div className="flex pl-10">
              <TooltipComponent content="Profile" position="BottomCenter" onClick={navigateToprofile}>
                <div
                  className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                >
                  <p>
                    <span className="text-gray-400 text-14">Hi, </span>{' '}
                    <span className="text-gray-400 font-bold ml-1 text-14">
                    {currentUser.displayName}
                    </span>
                  </p>
                  <MdKeyboardArrowDown className="text-gray-400 text-14" />
                </div>
              </TooltipComponent>
              <button title="Logout" className="btn btn-primary" onClick={handleLogout}>Logout</button>
            </div>
          </>
          {isClicked.chat && (<Chat />)}
          {isClicked.notification && (<Notification />)}
          {isClicked.register && (<Register />)}
          {isClicked.login && (<Login />)}
        </div>
        }
    </div>
  )
}

export default Navbar