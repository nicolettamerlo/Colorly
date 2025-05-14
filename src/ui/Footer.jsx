import SvgLink from "../ui/navigation/SvgLink"
import { contactLinks } from "../services/links";

const renderLinks = contactLinks.map((link, index) => {
  return <SvgLink key={index} link={link} />
});

function Footer() {
  return (
    <footer className='footer'>
      <div className="footer-container">
        <div className="footer-container-inside">
          <div className="footer-copyright">
            @{new Date().getFullYear()} Nicoletta Merlo 
          </div>        
            <div className="footer-icons">
              <div className="contacts-icons">
                  {renderLinks}
              </div>
          </div>   
        </div>
      </div>
    </footer>
  )
}

export default Footer