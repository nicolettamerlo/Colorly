import { useState } from 'react'
import Header from '../ui/Header'
import ColorModes from '../components/ColorModes';
import CodeSnippet from '../components/CodeSnippet';
import { convertFormat } from '../assets/js/colorMethods';
import SwatchWithTransparency from '../components/SwatchWithTransparency';
import ButtonConvert from '../components/buttons/ButtonConvert';
import { deepSkyBlue, grey } from '../services/colorsData';

function FormatCoverterPage() {

  const [swatchColor, setSwatchColor] = useState(deepSkyBlue);
  const [curColor, setCurColor] = useState(deepSkyBlue);
  const [isValidSWatch, setIsValidSwatch] = useState(true);

  const page = {
    title:'HTML Color Formats Converter',
    description:'Convert colors between HEX, RGBA, HSL, and HSV formats. Fast and easy color format conversion for web projects.'
  };

  return (
    <div className='page formatConverterPage'>
        <Header title={page.title} description={page.description}/>
        <div className="page-container formatConverterPage-container">
        <ColorModes parentColor={swatchColor} setParentColor={setSwatchColor} setIsValidSwatch={setIsValidSwatch} />
          <div className='formatConverterPage-converter'>
          <SwatchWithTransparency color={isValidSWatch ? convertFormat(swatchColor, 'hex') : grey} size="medium" isDisabled={!isValidSWatch} />
          <ButtonConvert action={setCurColor} actionArgs={swatchColor} isDisabled={!isValidSWatch} />
          </div>
          <div className='formatConverterPage-results'>
              <div className='formatConverterPage-results-current'> 
                current color: 
                <SwatchWithTransparency color={convertFormat(curColor, 'hex')} size="small" />
              </div>
              <div className='formatConverterPage-results-list'>
              <CodeSnippet codeString={convertFormat(curColor, 'hex')} language="javascript" showLineNumbers={false} />   
              <CodeSnippet codeString={convertFormat(curColor, 'rgb')} language="CSS" showLineNumbers={false} />   
              <CodeSnippet codeString={convertFormat(curColor, 'hsv')} language="CSS" showLineNumbers={false} />  
              <CodeSnippet codeString={convertFormat(curColor, 'hsl')} language="CSS" showLineNumbers={false} />  
              {convertFormat(curColor, 'name') && <CodeSnippet codeString={convertFormat(curColor, 'name')} language="CSS" showLineNumbers={false} /> }    
              {!convertFormat(curColor, 'name') && (<div className='conversion-name'>no corrisponding name</div>) }  
              </div>  
          </div>
        </div>
    </div>
  )
}

export default FormatCoverterPage