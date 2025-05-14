
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { menuLinks } from "../services/links";
import MenuToggle from './navigation/MenuToggle';
import logo from '../assets/images/logo.png';
import ThemeSwitch from './navigation/ThemeSwitch';
import NavElement from './navigation/NavElement';


function Navbar() {

  const [isCollapsed, setIsCollapsed] = useState(true);

    const renderNavElements = menuLinks.map((link, index) => {
      return <NavElement link={link} key={index} setIsCollapsed={setIsCollapsed} />;
    })

  return (
    <div className='navbar'>
      <div className='navbar-container'>
        <div className='navbar-logo'>
            <NavLink to={'/'}>
              <img src={logo} alt="logo" className='navbar-logo-img' />
              Colorly
            </NavLink>
        </div>
        {isCollapsed && <ThemeSwitch />  }  
        <MenuToggle isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>
      {!isCollapsed && 
      <div className='menu-container'>
        <div className='menu'>
            <ul className="menu-list">
              {renderNavElements}
            </ul>
        </div>
      </div>}
    </div>
  )
}

export default Navbar