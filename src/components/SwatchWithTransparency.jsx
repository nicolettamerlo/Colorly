import pattern from '../assets/images/transparent-pattern.jpg';
import patternSmall from '../assets/images/transparent-pattern-small.jpg';
import { grey } from '../services/colorsData';

function SwatchWithTransparency({size='medium', color=grey, isDisabled=false, isValidColor=true }) {

  const urlBg = size==='picker' || size==='extra-small' ? `url(${patternSmall})` : `url(${pattern})`;

  return (
    <div className={`swatch-with-transparency swatch-with-transparency--${size}`} style={{backgroundImage:urlBg}}>
      <div className={`swatch-with-transparency-inner swatch-with-transparency--${size} ${isDisabled ? 'swatch-with-transparency-inner--disabled' : ''} ${isValidColor ? ' ' : 'swatch-with-transparency--invalid'} `} style={{backgroundColor:color}}>
      </div>
    </div>
  )
}

export default SwatchWithTransparency