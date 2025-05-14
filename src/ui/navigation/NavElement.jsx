import { NavLink } from "react-router-dom";

function NavElement({link, setIsCollapsed}) {
  return (
        <NavLink className='menu-list-item'  onClick={() =>  setIsCollapsed(true)} to={link.url}>{link.key}</NavLink>
  )
}

export default NavElement