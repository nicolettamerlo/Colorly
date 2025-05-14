import { useState } from 'react'
import { convertFormat } from '../../assets/js/colorMethods';


function Swatch({ color, format, isDisabled=false }) {

  const [isHover, setIsHover] = useState(false)
  const [isCopied, setIsCopied] = useState(false)


  function handleClick() {

    const copyContent = async () => {
      try {
        await navigator.clipboard.writeText(convertFormat(color, format));
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }

    copyContent();

    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 400);
  }

  return (
    <li className={`swatch ${isCopied ? 'swatch--active' : ''} ${isDisabled ? 'swatch--disabled' : ''}`}
    onMouseOver={()=> setIsHover(true)}
    onMouseOut={()=> setIsHover(false)}
    onClick={() => handleClick()}
    >
      <div className='swatch-color'
      style={{backgroundColor:color}}
      > 
        {isHover && <div className={`swatch-color-label ${isCopied ? 'swatch-color-label--hidden' : ''}`}>{convertFormat(color, format)}</div>}
        {isCopied && <div className='swatch-color-copy'>copied!</div>}
      </div>
    </li>
  )
}

export default Swatch