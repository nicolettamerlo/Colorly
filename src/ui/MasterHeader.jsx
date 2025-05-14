import { NavLink } from 'react-router-dom';
import logo  from '../assets/images/logo.png';
import preview from '../assets/images/colorSchemeGenerator.png'
import { menuLinks } from '../services/links';

const MasterHeader = () => {


const renderLinks = menuLinks.map((link, index) => {
      return <NavLink to={link.url} className="secondary-btn" key={index}>{link.key}</NavLink> 
})

  return (
    <header className="master-header">
      <div className="master-header-content">
        <div className="master-header-left">
          <div className='master-header-title-container'>
            <img src={logo} alt="logo"  className="master-header-logo"/>
            <h1 className="master-header-title">Colorly</h1>
          </div>
          <p className="master-header-payoff">Colors made simple.</p>
          <p className="master-header-description">
            A clean, intuitive tool for developers and designers. Effortlessly convert color formats, craft palettes, and generate CSS filters — all in one place
          </p>
          <div className='tools-link'>
            {renderLinks}
          </div>
        </div>
        <div className="master-header-right">
          <div className="master-header-image-container">
              <img src={preview} className='master-header-image'/>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MasterHeader;
