function Header({ title, description}) {

  return (
  <div className="header-page--container">
      <div className="header-page">
          <h1 className='header-page-title'>{title}</h1>
          <p className='header-page-description'>{description}</p>
      </div>
  </div>
  )
}

export default Header