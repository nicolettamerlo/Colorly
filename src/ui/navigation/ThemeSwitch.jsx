import { useContext } from 'react'
import { ThemeContext } from '../../AppLayout';

function ThemeSwitch() {

  const theme = useContext(ThemeContext);

  return (
    <button className={`navbar-switch`}
    onClick={theme.toggleTheme}
    > 
      <div className={`navbar-switch-circle`}
      ></div>
    </button>
  )
}

export default ThemeSwitch