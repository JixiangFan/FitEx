import React from 'react'
import { Link, NavLink } from 'react-router-dom';

import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { links } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { getAuth } from "firebase/auth";
const Sidebar = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-grey-700 dark:text-grey-200 dark:hover:text-black hover:bg-light-grey m-2';

  return (

    <div className=" ml-3 h-screen overflow-auto pb-10 text-2xl">

      <div className="mt-10 ">
        {links.map((item) => (
          <div key={item.title}>
            <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
              {item.title}
            </p>
            {item.links.map((link) => (
              <NavLink
                to={`/${link.name}`}
                key={link.name}
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#8AABBD" : '',
                })}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
              >
                {link.icon}
                <span className="capitalize ">{link.name}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </div>

  )
}

export default Sidebar