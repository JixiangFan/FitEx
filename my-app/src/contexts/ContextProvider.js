import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
    chat: false,
    userProfile: false,
    notification: false,
  };

export const ContextProvider = ({ children }) => {
    
    const [currentColor, setCurrentColor] = useState('#03C9D7');
    
    const [themeSettings, setThemeSettings] = useState(false);
    
    const [activeMenu, setActiveMenu] = useState(false);
    const [isClicked, setIsClicked] = useState(initialState);
    const [screenSize, setScreenSize] = useState(undefined);

   
    
      const setColor = (color) => {
        setCurrentColor(color);
        localStorage.setItem('colorMode', color);
        setThemeSettings(false);
      };
    
    const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });


    return (
        <StateContext.Provider value={{ currentColor, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setColor, themeSettings, setThemeSettings }}>
          {children}
        </StateContext.Provider>
      );
};

export const useStateContext = () => useContext(StateContext);

