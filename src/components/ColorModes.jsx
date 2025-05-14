import { useState } from 'react'
import { convertFormat, getFormat, getFormatLabel,  isValidColor, getNextFormat } from '../assets/js/colorMethods';
import { switchHorizontal } from '../services/icons';
import { deepSkyBlue } from '../services/colorsData';
import ButtonIcon from './buttons/ButtonIcon';
import PickerChrome from './PickerChrome';

function ColorModes({ parentColor, setParentColor, setParentColorFormat, setIsValidSwatch, isSvgFilterPage=false }) {

  const [curFormat, setCurFormat] = useState(getFormat(parentColor)); // hex hex8 rgb hsv hsl
  const [curFormatLabel, setCurFormatLabel] = useState(getFormatLabel(parentColor)); //hex hex8 rgb rgbs hsv hsva hsl hsls name
  const [inputColor, setInputColor] = useState(parentColor);
  const [isValid, setIsValid] = useState(true);
  const [isPicker, setIsPicker] = useState(false);



  // on blur input function
  function handleInputColor() {
    if(!isValidColor(inputColor)) setValidity(false);
    if(isValidColor(inputColor)) {
      setValidity(true);
      // SET THE FORMAT
      const format = getFormat(inputColor);
      if(curFormat !== format) setCurFormat(format);
      
      const formatLabel = getFormatLabel(inputColor);
      if(curFormatLabel !== formatLabel) setCurFormatLabel(formatLabel);

      setInputColor(convertFormat(inputColor, format)); 
      setParentColor(convertFormat(inputColor, format));  
    }
  }

  function savePickerValue(pickerColor) { 
    let newColor = pickerColor;
    if(curFormat==='rgb' || curFormat==='hsl' || curFormat==='hsv') newColor = convertFormat(pickerColor, curFormat);
    if(curFormat==='name' && convertFormat(pickerColor, 'name')) newColor = convertFormat(pickerColor, curFormat);
    setInputColor(newColor);
    setParentColor(newColor);
    setCurFormat(getFormat(newColor));
    setCurFormatLabel(getFormatLabel(newColor));
    setValidity(true);
    
  }

  function switchFormat() {
    const newColorFormat = convertFormat(inputColor, getNextFormat(curFormat));
    setInputColor(newColorFormat);
    setCurFormat(getFormat(newColorFormat));
    const formatLabel = getFormatLabel(newColorFormat);
    setCurFormatLabel(formatLabel);
    if(isSvgFilterPage) setParentColorFormat(getFormat(newColorFormat)); 
  }

  function setValidity(bool) {
    setIsValid(bool);
    setIsValidSwatch(bool);
  }

  return (
    <div className='color-modes'>
      <button className='btn btn--light color-modes-picker-btn'
      onClick={()=> setIsPicker(true)}  
      >
      <div className="color-modes-picker-btn-spectrum"></div>
      </button>
      <div className='color-modes-container'>
        <input value={inputColor}
        onChange={(e) =>{setInputColor(e.target.value)}} 
        onBlur={handleInputColor}
        className={`color-modes-input ${!isValid ? 'color-modes-input--invalid' : ''}`}
        type="text" />
        {isValid && 
          <div className='color-modes-format'>
          <ButtonIcon imgUrl={switchHorizontal} action={switchFormat} />
          <div className='color-modes-format-label'>{curFormatLabel}</div>
        </div>
        }
      </div>
      { isPicker && <PickerChrome initColor={ isValid ? convertFormat(inputColor, 'hex') : deepSkyBlue } setIsPicker={setIsPicker} savePickerValue={savePickerValue} />
      }
    </div>
       
  )
}

export default ColorModes