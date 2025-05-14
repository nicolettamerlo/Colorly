function ButtonIcon({imgUrl, action, actionArgs=null, isDisabled=false}) {

  return (
    <button className= {
      `${(actionArgs==='addSwatch' || actionArgs==='removeSwatch' ) 
        // btn swatch
        ? `btn-swatch ${isDisabled ? 
          'btn-swatch--disabled'
          : ''}`
        // btn-icon
        : `btn-icon ${isDisabled ? 'btn-icon--disabled' : ''}` } 
      `
    }
    onClick={() => {if(!isDisabled) action(actionArgs)} }
    ><img src={imgUrl}></img></button>
  )
}

export default ButtonIcon