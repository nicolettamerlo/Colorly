import { Link } from 'react-router-dom'

function SvgLink({link}) {


  return (
    <Link to={link.url} 
        className="svg-link"
        target={"_blank"}
    >
        <img src={link.icon} alt={link.alt} className="svg-link-image"/>
    </Link>
  )
}

export default SvgLink
