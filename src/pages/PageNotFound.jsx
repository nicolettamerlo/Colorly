import Header from '../ui/Header';
import { NavLink } from 'react-router-dom';
import { menuLinks } from '../services/links';


function PageNotFound() {

  const page = {
    title:'404 - Page Not Found',
    description:'The page you were looking for doesn\'t exist!'
  }

const renderLinks = menuLinks.map((link, index) => {
      return <NavLink to={link.url} className="secondary-btn" key={index}>{link.key}</NavLink> 
})

  return (
    <div className='page pageNotFound'>
      <Header title={page.title} description={page.description}/>
      <div className="page-container pageNotFound-container">
        <div>
          <NavLink to={'/'} className="secondary-btn">Back to the Homepage</NavLink> 
        </div>           
        <div className='divider'></div>
        <div className='pageNotFound-options'>
          <h3 className='pageNotFound-options-title'>You may be interested in:</h3>
          <div className='tools-link'>
            {renderLinks}
          </div>   
        </div>
      </div>
    </div>
  )
}

export default PageNotFound