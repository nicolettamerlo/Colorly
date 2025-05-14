import { useRef, useState, createContext } from 'react'
import { minus, plus, undo, redo, swatchbook, shuffle, options } from '../services/icons';
import { deepSkyBlue } from '../services/colorsData';
import { scrollToPosition } from '../assets/js/helpers';
import { colorAdjustment, convertFormat, getFormatLabel, areColorsEquals, getFormat } from '../assets/js/colorMethods';
import Header from '../ui/Header';
import ColorModesGenerator from '../components/ColorModesGenerator';
import ColorScheme from '../components/color-scheme/ColorScheme';
import FavoriteSchemes from '../components/color-scheme/FavoriteSchemes';
import SchemeCodeModal from '../components/color-scheme/SchemeCodeModal';
import SchemeTypeModal from '../components/color-scheme/SchemeTypeModal';
import ButtonIcon from '../components/buttons/ButtonIcon';
import SimilarSchemes from '../components/color-scheme/SimilarSchemes';


export const SchemeContext = createContext(null);


function ColorSchemesGeneratorPage() {
 
  const page = {
    title:"color schemes generator tool",
    description:"Create stunning color combinations. Explore beautiful palettes and find the perfect match for your next project!"
  };

  const initScheme = {
    color:deepSkyBlue,
    type:'monochromatic',  
    format:'hex',
    numb:5,
  }

  // back and forward generated schemes
  const [generatedSchemes, setGeneratedSchemes] = useState([{swatch:initScheme.color, type:initScheme.type}]);
  const [curIndex, setCurIndex] = useState(0);
  // generator color scheme
  const [curColor, setCurColor] = useState(initScheme.color);
  const [curFormat, setCurFormat] = useState(initScheme.format);
  const [curFormatLabel, setCurFormatLabel] = useState('hex'); //hex hex8 rgb rgbs hsv hsva hsl hsls name

  const [curType, setCurType] = useState(initScheme.type);
  const [curNumb, setCurNumb] = useState(initScheme.numb);
  const [isFavoritesModal, setIsFavoritesModal] = useState(false);
  const [isCodeModal, setIsCodeModal] = useState(false);
  const [codeScheme, setCodeScheme] = useState({swatches:null, type:null, format:null, category:null});
  const [isTypeModal, setIsTypeModal] = useState(false);
  const [isValidSwatch, setIsValidSwatch] = useState(true);
  const [pageScroll, setPageScroll] = useState(0);

  const isBtnAddDisabled = curNumb >= 8;
  const isBtnRemoveDisabled = curNumb <= 2;

  const mainSchemeContainer = useRef(null);

  // undo and redo
  function handleIndex(action) {
    const newIndex = action==='undo' ? curIndex+1 : curIndex-1
    const color = generatedSchemes[newIndex].swatch;
    const type = generatedSchemes[newIndex].type;

    const newColor = convertFormat(color, curFormat==='name' ? 'hex' : curFormat);
    setCurColor(newColor);
    if(curFormat==='name') {
        setCurFormat(getFormat(newColor));
        setCurFormatLabel(getFormatLabel(newColor));
    }

    if(curType !== type) setCurType(type);
    setCurIndex(newIndex);

    if(!isValidSwatch) setIsValidSwatch(true);
  }

  function disableAdjustBtn(action) {
    // disableBtn if color cannot be modified further
    if(!isValidSwatch) return true;
    else {
      const newColor = colorAdjustment(curColor, action);
      if(areColorsEquals(newColor, curColor)) return true;
    }
    return false;
  }

  function toggleSwatch(action) {
    if(action==='addSwatch') {
      setCurNumb(current => current + 1);
    } else {
      setCurNumb(current => current - 1);
    }
  }

  function generateScheme(action) {
    const newColor = colorAdjustment(curColor, action);
  
    if(isValidSwatch) {
      let newFormat = curFormat;
      if(curFormat==='name') newFormat = 'hex';
      const newColorFormat = convertFormat(newColor, newFormat);
      setCurColor(newColorFormat);
      setCurFormat(newFormat);
      setCurFormatLabel(getFormatLabel(newColorFormat));
    }
    // can be only a random color
    if(!isValidSwatch) {
      setCurColor(newColor)
      setIsValidSwatch(true);
      setCurFormat('hex');
      setCurFormatLabel('hex');
    }
    saveLatestSchemes(newColor);  
  }

  function saveLatestSchemes(color) {
    const newScheme = {swatch:color, type:curType, numb:curNumb};
    if(generatedSchemes.length < 20 ) {
      setGeneratedSchemes(current => [newScheme, ...current]);
    } else {
      const newGeneratedSchemesList = generatedSchemes.slice(0, -1);
      setGeneratedSchemes([newScheme, ...newGeneratedSchemesList]);
    }
    if(curIndex !== 0) setCurIndex(0);
  }

  // load scheme into the generator when the launch btn has clicked

  function loadScheme(color, type, numb, isFromFavoriteModal=false) {
    const format = getFormat(color);
    const label = getFormatLabel(color);

    setCurColor(color);
    setCurFormat(format);
    setCurFormatLabel(label);
    setIsValidSwatch(true);
    saveLatestSchemes(color);  
    setCurType(type);
    setCurNumb(numb);

    let top = mainSchemeContainer.current?.getBoundingClientRect().top;
    if(isFromFavoriteModal) top = 180;
    scrollToPosition(top, 150);
  }

  // load the scheme date when the code button in the color scheme is clicked
  function setCodeModal(scheme) {
    if(scheme.category==='favorite') {
      setIsFavoritesModal(false);
    } 
    setPageScroll(window.scrollY);
    setIsCodeModal(true);
    scrollToPosition(0,0);
    setCodeScheme({swatches:scheme.swatches, type:scheme.type, format:scheme.format, category:scheme.category});

  }

  function launchFavoriteModal() {
    setIsFavoritesModal(true);
    scrollToPosition(0, 0);
    document.querySelector('body').classList.add('no-scroll');
  }
  function closeFavoriteSchemesModal() {
    setIsFavoritesModal(false);
    setTimeout(() => {
      const top = mainSchemeContainer.current.getBoundingClientRect().top;
      scrollToPosition(top + window.scrollY, 10);
    }, 100);
    document.querySelector('body').classList.remove('no-scroll');
  }

  return (
    <SchemeContext.Provider value={{curColor, setCurColor,curFormat, setCurFormat, curFormatLabel, setCurFormatLabel, isValidSwatch, setIsValidSwatch, curType, curNumb, isBtnAddDisabled, isBtnRemoveDisabled, pageScroll, toggleSwatch, setCodeModal, loadScheme, closeFavoriteSchemesModal, setIsFavoritesModal, saveLatestSchemes}}>
    <>
      {isCodeModal && <SchemeCodeModal setIsCodeModal={setIsCodeModal} scheme={codeScheme} />}
      {isFavoritesModal && <FavoriteSchemes />}
      <div className='page schemesGeneratorPage'>
        <Header title={page.title} description={page.description} />
        <div className="page-container generator-container" ref={mainSchemeContainer}>
          <ColorScheme scheme={{swatch:curColor, type:curType, numb:curNumb}} isGeneratorScheme={true} format={curFormat === 'name' ? 'hex' : curFormat} schemeCategory={'generator'} />
          <div className='color-adjustment'>
            <div className='color-adjustment-container color-adjustment-container--left'>
              <div className='color-adjustment-btns'>
                <ButtonIcon imgUrl={minus} action={generateScheme} actionArgs={'darken'} isDisabled={disableAdjustBtn('darken')} />   
                <ButtonIcon imgUrl={plus} action={generateScheme} actionArgs={'lighten'} isDisabled={disableAdjustBtn('lighten')}  />                            
              </div>
              <div className='color-adjustment-label'>lightness</div>
            </div>
            <div className="color-adjustment-indicator">
              <ColorModesGenerator />
            </div>
            <div className='color-adjustment-container color-adjustment-container--right'>
              <div className='color-adjustment-btns'>     
                <ButtonIcon imgUrl={plus} action={generateScheme} actionArgs={'saturate'} isDisabled={disableAdjustBtn('saturate')}  /> 
                <ButtonIcon imgUrl={minus} action={generateScheme} actionArgs={'desaturate'} isDisabled={disableAdjustBtn('desaturate')} />           
              </div>
                <div className='color-adjustment-label'>saturation</div>
            </div>
          </div>
          <div className="color-options">
            <ButtonIcon imgUrl={shuffle} action={generateScheme} actionArgs={'random'} />
            <ButtonIcon imgUrl={undo} action={handleIndex} actionArgs={'undo'} isDisabled={(generatedSchemes.length > 1 && curIndex < generatedSchemes.length-1)  ? false : true} />
            <ButtonIcon imgUrl={redo} action={handleIndex} actionArgs={'redo'} isDisabled={(curIndex==0 ? true : false)} />
            <ButtonIcon imgUrl={swatchbook} action={launchFavoriteModal} />
            <ButtonIcon imgUrl={options} action={setIsTypeModal} actionArgs={true} />

            {isTypeModal && <SchemeTypeModal setIsModal={setIsTypeModal} schemeType={curType} setSchemeType={setCurType} /> }
          </div>
        </div>
        <SimilarSchemes />
      </div>
    </>
    </SchemeContext.Provider>
  )
}

export default ColorSchemesGeneratorPage