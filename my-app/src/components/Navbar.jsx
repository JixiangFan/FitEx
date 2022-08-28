import React, { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/avatar.jpg';
import { Chat, Notification, UserProfile } from '.';
import { Register,Login } from '../pages'
import { useStateContext } from '../contexts/ContextProvider';
import { useAuth } from '../contexts/AuthContext'

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
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

  async function handleLogout() {
    setError("")

    try
    {
      await logout()
    } catch {
      setError("Failed to log out")
    }
  }




  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton title="Menu" customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} color={currentColor} icon={<AiOutlineMenu />} />
      <div className="flex">

        {currentUser
          ?
          <><NavButton title="Chat" dotColor="#03C9D7" customFunc={() => handleClick('chat')} color={currentColor} icon={<BsChatLeft />} />
            <NavButton title="Notification" dotColor="rgb(254, 201, 15)" customFunc={() => handleClick('notification')} color={currentColor} icon={<RiNotification3Line />} />
            <TooltipComponent content="Profile" position="BottomCenter">
            <div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
              onClick={() => handleClick('userProfile')}
            >
              <img
                className="rounded-full w-8 h-8"
                src={avatar}
                alt="user-profile" />
              <p>
                <span className="text-gray-400 text-14">Hi,</span>{' '}
                <span className="text-gray-400 font-bold ml-1 text-14">
                  {currentUser.email}
                </span>
              </p>
              <MdKeyboardArrowDown className="text-gray-400 text-14" />
            </div>
            </TooltipComponent>
            <button title="Logout" dotColor="rgb(254, 201, 15)" onClick={handleLogout}>Logout</button>
          </>
            
          :
          <>
            <TooltipComponent content="register" position="BottomCenter">
            <div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
              onClick={() => handleClick('register')}
            >
              <p>
                <span className="text-gray-400 font-bold ml-1 text-14">
                  Sign up
                </span>
              </p>
            </div>
            </TooltipComponent>
            <TooltipComponent content="login" position="BottomCenter">
            <div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
              onClick={() => handleClick('login')}
            >
              <p>
                <span className="text-gray-400 font-bold ml-1 text-14">
                login
                </span>
              </p>
            </div>
          </TooltipComponent>
          </>
          

          



        }


        {isClicked.chat && (<Chat />)}
        {isClicked.notification && (<Notification />)}
        {isClicked.userProfile && (<UserProfile />)}
        {isClicked.register && (<Register />)}
        {isClicked.login && (<Login />)}
      </div>
    </div>
  )
}

export default Navbar