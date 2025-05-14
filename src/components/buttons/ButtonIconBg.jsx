function ButtonIconBg({imgUrl, action, bgColor, extraCls='', actionArgs=null}) {

  return (
    <button className={`btn-icon-bg btn-icon-bg--${bgColor} ${extraCls}`} 
    onClick={() => action(actionArgs) }
    ><img src={imgUrl}></img></button>
  )
} 

export default ButtonIconBg;