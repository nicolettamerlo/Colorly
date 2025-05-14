
function MenuToggle({isCollapsed, setIsCollapsed}) {
  return (
    <div className={`menu-toggle-container ${!isCollapsed ? 'menu-toggle-container--open' : ''}`}>
      <button id="menu-toggle-btn" className='menu-toggle-btn' onClick={()=>setIsCollapsed(!isCollapsed)}>
        <span className="menu-toggle-btn-bar menu-toggle-btn-bar--top"></span>
        <span className="menu-toggle-btn-bar menu-toggle-btn-bar--middle"></span>
        <span className="menu-toggle-btn-bar menu-toggle-btn-bar--bottom"></span>
      </button>
  </div>
  )
}

export default MenuToggle