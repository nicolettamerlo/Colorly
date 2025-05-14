import { useState } from 'react'
import { GithubPlacement } from '@uiw/react-color-github';
import { close, checked } from '../services/icons';
import Chrome from '@uiw/react-color-chrome';
import SwatchWithTransparency from "../components/SwatchWithTransparency";

function PickerChrome({initColor, setIsPicker, savePickerValue}) {

  const [pickerColor, setPickerColor] = useState(initColor);

  function dimissPicker() {
    setIsPicker(false);
    savePickerValue(pickerColor);
 }
  return (
    <div className='color-picker-chrome'>
    <div className='color-picker-chrome-header'>
      <SwatchWithTransparency color={pickerColor} size="picker" isDisabled={false} />
      <div className='color-picker-chrome-header-btns'>
        <img className='color-picker-chrome-header-btns-icon saveColorBtn' src={checked} onClick={dimissPicker}></img>
        <img className='color-picker-chrome-header-btns-icon dismissColorBtn' src={close} onClick={()=> setIsPicker(false)}></img>
      </div>
    </div>
    <Chrome
      color={pickerColor}
      placement={GithubPlacement.Bottom}
      onChange={(color) => {setPickerColor(color.hexa);}}
    />
  </div>
  )
}

export default PickerChrome