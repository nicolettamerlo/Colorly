import { useState } from "react";
import { convertToFilter } from '../assets/js/svgFilterHelpers';
import { convertFormat } from '../assets/js/colorMethods';
import { cat } from '../services/icons';
import { fillExample, svgHtmlImage, filterExample, fullExample } from "../services/svgPageData";
import { deepSkyBlue, deepSkyBlueFilter } from "../services/colorsData";
import { displayMatchMessage } from "../assets/js/svgFilterHelpers";
import SwatchWithTransparency from "../components/SwatchWithTransparency";
import ButtonConvert from "../components/buttons/ButtonConvert";
import Header from "../ui/Header"
import ColorModes from "../components/ColorModes";
import CodeSnippet from "../components/CodeSnippet";
import CopyToClipboard from "../components/CopyToClipboard";


function SVGFilterPage() {

  const page = {
    title:"CSS Color To Filter Converter",
    description:"Convert HEX, RGB, HSL, or HSV colors into CSS filter values. Easily recolor SVG images using only CSS"
  }

  const [color, setColor] = useState(deepSkyBlue);
  const [isValidSWatch, setIsValidSwatch] = useState(true);
  const [filter, setFilter] = useState(deepSkyBlueFilter);
  const [filterColor, setFilterColor] = useState(deepSkyBlue);
  const [loss, setLoss] = useState(0.0);
  const [curColorFormat, setCurColorFormat] = useState('hex');

  function filterValues() {
    const filterProperties = filter.split(" ").map(property => property.split("("));
    let filterValues = [];
    filterProperties.map(el => {
       const value =  el[1].split(")");
       filterValues.push(value[0])
    })
    return filterValues;
  }

  function handleConvertionToFilter() {
    const res = convertToFilter(color);
    setFilter(res.filter);
    setFilterColor(color);
    setLoss(res.loss);
  }

  return (
    
    <div className='page svgFilterPage'>
      <Header title={page.title} description={page.description}/>

      <div className="page-container svgFilterPage-converter-container">
        <ColorModes parentColor={color} setParentColor={setColor} setIsValidSwatch={setIsValidSwatch} setParentColorFormat={setCurColorFormat} isSvgFilterPage={true} />
        <div className="svgFilterPage-converter">
        {isValidSWatch && <SwatchWithTransparency color={convertFormat(color, 'hex')} size="medium" isDisabled={false} /> }
        {!isValidSWatch && <SwatchWithTransparency size="medium" isDisabled={true} /> }
        <ButtonConvert action={handleConvertionToFilter} actionArgs={color} isDisabled={!isValidSWatch} />
        <div className="svgFilterPage-converter-svg">
          <SwatchWithTransparency color={convertFormat(filterColor, 'hex')} size="cat" isDisabled={false} />          
        </div>
        </div>
        <div className="svgFilterPage-result">
          <div className="svgFilterPage-result-messages">
            <div className="svgFilterPage-result-messages-paragraph">
              Color loss is <span className="loss-value">{loss}</span>
            </div>
            <div className="svgFilterPage-result-messages-paragraph">
              This is a <span className={`match-value match-value--${displayMatchMessage(loss).value}`}>{displayMatchMessage(loss).text}</span><span>{` ${displayMatchMessage(loss).appendix}`}</span>
            </div>
          </div>
          <div className="svgFilterPage-result-filter">
            <div className="svgFilterPage-result-filter-indicator">
              <SwatchWithTransparency color={convertFormat(filterColor, 'hex')} size="extra-small" />
              <div className="svgFilterPage-result-filter-indicator-label">{convertFormat(filterColor, curColorFormat)}</div>
            </div>
            <CopyToClipboard text={`filter:${filter};`} type="absolute" />
            <span className="property">filter</span><span className="colon">:</span> <span className="filterName">brightness</span><span className="bracket">(</span><span className="filterValue">{filterValues()[0]}</span><span className="bracket">)</span> <span className="filterName">saturate</span><span className="bracket">(</span><span className="filterValue">{filterValues()[1]}</span><span className="bracket">)</span> <span className="filterName">invert</span><span className="bracket">(</span><span className="filterValue">{filterValues()[2]}</span><span className="bracket">)</span> <span className="filterName">sepia</span><span className="bracket">(</span><span className="filterValue">{filterValues()[3]}</span><span className="bracket">)</span> <span className="filterName">saturate</span><span className="bracket">(</span><span className="filterValue">{filterValues()[4]}</span><span className="bracket">)</span> <span className="filterName">hue-rotate</span><span className="bracket">(</span><span className="filterValue">{filterValues()[5]}</span><span className="bracket">)</span> <span className="filterName">brightness</span><span className="bracket">(</span><span className="filterValue">{filterValues()[6]}</span><span className="bracket">)</span> <span className="filterName">contrast</span><span className="bracket">(</span><span className="filterValue">{filterValues()[7]}</span><span className="bracket">)</span> <span className="filterName">opacity</span><span className="bracket">(</span><span className="filterValue">{filterValues()[8]}</span><span className="bracket">)</span><span className="semicolon">;</span>
          </div>
        </div>
      </div>
      <div className='divider'></div>
      <div className="page-container svgFilterPage--explanation">
        <h2 className="page-title">How to Change the Colorof an SVG image with CSS</h2>
        <div className="content">
          <p>
            There are several ways to change the color of an SVG file, and one of the simplest is by using the
            <span className="color-box color-box--light t-bold"> fill </span> in your CSS. You can assign a color using HEX, RGB, or HSL values. For example, suppose we have an SVG of a cat and we want to color it <span className="t-bold">Deep Sky Blue </span><span className="color-box color-box--skyblue">#00BFFF</span>. Our CSS would look like this:        
          </p>
            
          <p>Our CSS file will look like this</p>
          <CodeSnippet codeString={fillExample} language="scss" />
      
          <p>And here's the result:</p>
         
          <div className="fill-result">
            <img src={cat} className="svg-image svg-image--default"></img> 
            <span className="arrow" >&rarr;</span>
            <img src={cat} className="svg-image svg-image--skyblue"></img> 
          </div>
          <p>
            However, this method <span className="t-bold"> won't work</span> if the SVG is embedded using an <span className="color-box color-box--light t-bold"> &lt;img&gt;</span> tag in the HTML. In that case, the <span className="color-box color-box--light t-bold"> fill </span> property has no effect, and this is where the filter property comes in handy.
            Unlike <span className="color-box color-box--light t-bold">fill </span>, the <span className="color-box color-box--light t-bold">filter </span> property doesn't accept standard color values like HEX, RGB, or HSL. 
          </p>
          <p>Instead, you need to convert your desired color into a corresponding CSS filter value.</p>
          <CodeSnippet codeString={svgHtmlImage} language="HTML" />
          <br></br>
          <CodeSnippet codeString={filterExample} language="SCSS" />
        </div>
        <div className="content">
          <h3 className="page-title">Styling SVGs for Different States</h3>
          <p>A practical use case for the filter property is changing the color of an SVG based on interaction states like normal, hover, and active
            Let’s say we want the image to appear:</p>
            <ul className="bullet-list">
              <li className="bullet-list-item">Magenta <span className="color-box color-box--magenta">#FF00FF</span> on hover</li>
              <li className="bullet-list-item">Yellow <span className="color-box color-box--yellow">#FFFF00</span> when active</li>
              <li className="bullet-list-item">Lime <span className="color-box color-box--lime">#00FF00</span> by default</li>
            </ul>
            <p>After converting the HEX values into filter values (you can use an online converter), the CSS would look like this:</p>
              <CodeSnippet codeString={fullExample} language="css" />
            <p>Hover your mouse over the image or click on it to see the effect.</p>
            <img src={cat} className="image-filter-demo"></img> 
        </div>
      </div>
    </div>
  )
}

export default SVGFilterPage