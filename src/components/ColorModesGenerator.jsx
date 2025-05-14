import { useContext, useState } from 'react'
import { convertFormat, getFormat, getFormatLabel,  isValidColor, getNextFormat } from '../assets/js/colorMethods';
import { SchemeContext } from '../pages/SchemesGeneratorPage';
import { deepSkyBlue, grey } from '../services/colorsData'
import ButtonIcon from './buttons/ButtonIcon'
import switchHorizontal from '../assets/images/icons/switch-horizontal.svg';
import PickerChrome from './PickerChrome';
import SwatchWithTransparency from './SwatchWithTransparency';

function ColorModesGenerator() {

  const schemeCtx = useContext(SchemeContext);

  const curColor = schemeCtx.curColor;
  const setCurColor = schemeCtx.setCurColor;
  const curFormat = schemeCtx.curFormat;
  const setCurFormat = schemeCtx.setCurFormat;
  const curFormatLabel = schemeCtx.curFormatLabel;
  const setCurFormatLabel = schemeCtx.setCurFormatLabel;
  const isValidSwatch = schemeCtx.isValidSwatch;
  const setIsValidSwatch = schemeCtx.setIsValidSwatch;
  const saveLatestSchemes = schemeCtx.saveLatestSchemes;


  const [isPicker, setIsPicker] = useState(false);

  // on blur event n input color
  function handleInputColor() {
    if(!isValidColor(curColor)) setIsValidSwatch(false);
    if(isValidColor(curColor)) {
        setIsValidSwatch(true);
    // SET THE FORMAT
      const format = getFormat(curColor);
      if(curFormat !== format) setCurFormat(format);
  
      const formatLabel = getFormatLabel(curColor);
      if(curFormatLabel !== formatLabel) setCurFormatLabel(formatLabel);
      
      const cleanedColor = convertFormat(curColor, curFormat);
      setCurColor(cleanedColor);
      saveLatestSchemes(cleanedColor);
    }
  }

  function savePickerValue(pickerColor) { 
    let newColor = pickerColor;

      if(curFormat==='rgb' || curFormat==='hsl' || curFormat==='hsv') newColor = convertFormat(pickerColor, curFormat);
      if(curFormat==='name' && convertFormat(pickerColor, 'name')) newColor = convertFormat(pickerColor, curFormat);
      setCurColor(newColor);
      setCurFormat(getFormat(newColor));
      setCurFormatLabel(getFormatLabel(newColor));
      setIsValidSwatch(true);

      saveLatestSchemes(newColor);
    
  }

  function switchFormat() {
    const newColorFormat = convertFormat(curColor, getNextFormat(curFormat));
      setCurColor(newColorFormat);
      setCurFormat(getFormat(newColorFormat));
      const formatLabel = getFormatLabel(newColorFormat);
      setCurFormatLabel(formatLabel);
  }


  return (
    <div className='color-modes color-modes--generator-page-layout'>
      <button className='btn btn--light color-modes-picker-btn'
      onClick={()=> setIsPicker(true)}>
        <div className="color-modes-picker-btn-spectrum"></div>
        <SwatchWithTransparency color={isValidSwatch ? convertFormat(curColor, 'hex') : grey} size="modes" isDisabled={!isValidSwatch} isValidColor={isValidSwatch ? true : false } />
      </button>
      <div className='color-modes-container'>
        <input value={curColor}
        onChange={(e) =>setCurColor(e.target.value)} 
        onBlur={handleInputColor}
        className={`color-modes-input ${(!isValidSwatch) ? 'color-modes-input--invalid' : ''}`}
        type="text" />
        {isValidSwatch && 
          <div className='color-modes-format'>
          <ButtonIcon imgUrl={switchHorizontal} action={switchFormat} />
          <div className='color-modes-format-label'>{curFormatLabel}</div>
        </div>
        }
      </div>
      { isPicker && <PickerChrome initColor={ isValidSwatch ? convertFormat(curColor, 'hex') : deepSkyBlue } setIsPicker={setIsPicker} savePickerValue={savePickerValue} />
      }
    </div>
       
  )
}

export default ColorModesGenerator