import { useContext, useRef, useState } from 'react'
import {convertFormat, getFormatLabel, getNextFormat, getFormat} from '../../assets/js/colorMethods';
import { scrollToPosition } from '../../assets/js/helpers';
import { rotate, close, switchHorizontal } from '../../services/icons';
import { SchemeContext } from '../../pages/SchemesGeneratorPage';
import Swatch from './Swatch';
import ButtonIconBg from '../buttons/ButtonIconBg'
import CodeSnippet from '../CodeSnippet';



function SchemeCodeModal({ scheme, setIsCodeModal }) {

  const schemeCtx = useContext(SchemeContext);

  const [format, setFormat] = useState(getFormat(scheme.swatches[0]));
  const [formatLabel, setFormatLabel] = useState(getFormatLabel(scheme.swatches[0]));
  const [language, setLanguage] = useState('scss');

  const modalEl = useRef(null);

  let scssCode = '';
  let cssCode = ''

  scheme.swatches.map((swatch, index) => {
    const swatchFormat = convertFormat(swatch, format);
    scssCode = scssCode.concat(`${index===0 ?'':'\n'}$color${index+1}: ${swatchFormat};`);
    cssCode = cssCode.concat(`${index===0 ?'':'\n'}//${swatchFormat};`);
  })

  const renderSwatches = scheme.swatches.map((swatch, index) => {
    return <Swatch key={index} color={swatch} format={format} />
  })
  
  function closeModal() {
    modalEl.current.style.opacity = 0;
    setTimeout(() => {
      setIsCodeModal(false);
      // if scheme is in favorite modal
      if(scheme.category==='favorite') {
        schemeCtx.setIsFavoritesModal(true);
      }
      scrollToPosition(schemeCtx.pageScroll, 0); 
    }, 600);
  }


  function switchFormat() {
    const newFormat = getNextFormat(format);
    setFormat(newFormat);
    const newColorFormat = convertFormat(scheme.swatches[0], newFormat);
    setFormatLabel(getFormatLabel(newColorFormat));
  }

  function toggleLanguage() {
    setLanguage((curr) => (curr==="css" ? "scss" : "css" ));
  }
  /// currently it doesn't work from favorite modal!!!!!!!!!!!!!!!!
  /// return to original poition in the original page
  return (
    <>
      <div className='overlay'></div>
      <div className='scheme-code' ref={modalEl}> 
        <div className="scheme-code-header">
          <h3 className='scheme-code-header-title'>Scheme colors</h3>
          <ButtonIconBg imgUrl={close} action={closeModal} bgColor={'white'} extraCls={'scheme-code-header-btn--close'} />  
        </div>
        <div className="scheme-code-body">
            <div className="color-scheme">
              <ul className="color-scheme-swatches">
                {renderSwatches}
              </ul> 
            </div>
            <h3 className='color-scheme-type'>{scheme.type} scheme</h3>
            <div className='scheme-code-snippet'>
              <h4 className='scheme-code-snippet-language'>{language}</h4>
             <CodeSnippet codeString={language==='css' ? cssCode : scssCode} language="css" />
            </div>
            <div className='scheme-code-body-btns'>
              <div className='scheme-code-body-btns-item'>
                <button className='btn-icon' onClick={switchFormat}><img src={switchHorizontal}></img></button>
                <div className='scheme-code-body-btns-item-label'>{formatLabel}</div>                
              </div>
              <div className='scheme-code-body-btns-item'>
                <button className='btn-icon' onClick={toggleLanguage}><img src={rotate}></img></button>
                <div className='scheme-code-body-btns-item-label'>{language}</div>                
              </div>              
            </div>
        </div>
      </div>
    </>
  )
}

export default SchemeCodeModal