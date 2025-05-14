import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { minus, plus, heart, heartFull, trashDark, sort, unsort, download, launch } from '../../services/icons';
import {grey} from '../../services/colorsData';
import { generateScheme, getBrightness } from '../../assets/js/colorMethods';
import { created, deleted, selectAllFavoriteSchemes } from '../../features/favoriteSchemes/favoritesSlice';
import { SchemeContext } from '../../pages/SchemesGeneratorPage';
import Swatch from './Swatch';
import ButtonIcon from '../buttons/ButtonIcon';




function ColorSchemeTest({ scheme, schemeCategory='default',  format='hex' }) {


  const schemeCtx = useContext(SchemeContext);


  const favoriteSchemes = useSelector(selectAllFavoriteSchemes);
  const [isFavorite, setIsFavorite] = useState(null);
  const [isConfirmDeleteModal, setIsConfirmDeleteModal] = useState(false);
  const [isLaunchEditModal, setIsLaunchEditModal] = useState(false);
  const [isSorted, setIsSorted] = useState(false);

  const swatches = generateScheme(scheme.swatch, scheme.type, scheme.numb);
  const sortedSwatches = generateScheme(scheme.swatch, scheme.type, scheme.numb).sort((a, b) => getBrightness(b) - getBrightness(a));

  function getSchemes() {
    if(isSorted) return sortedSwatches;
    return swatches;
  }

  const colorSchemeEl = useRef(null);

  const dispatch = useDispatch();

  const renderSwatches = getSchemes().map((swatch, index) => {
    if(schemeCategory==='generator' && schemeCtx.isValidSwatch===false) {
      return <Swatch key={index} color={grey} format={format} isDisabled={true} />
    }
    return <Swatch key={index} color={swatch} format={format} />
  })

  useEffect(() => {
    const res = favoriteSchemes.find((el) => el.swatch === scheme.swatch && el.type === scheme.type && el.numb === scheme.numb )==undefined;
    if(res) setIsFavorite(false)
    else setIsFavorite(true)
  }, [scheme, favoriteSchemes]);

  useEffect(() => {
    localStorage.setItem('favoriteSchemes', JSON.stringify(favoriteSchemes));
  }, [favoriteSchemes]);

  function addToFavorites() {
      setIsFavorite(true);
      dispatch(created(scheme.swatch, scheme.type, scheme.numb));    
  }

  function removeFromFavorites() {
    const currScheme = favoriteSchemes.find((el) => el.swatch === scheme.swatch && el.type === scheme.type);

    if(schemeCategory==='favorite') {
      colorSchemeEl.current.style.opacity = 0;
      setTimeout(() => {
        dispatch(deleted({schemeId:currScheme.id}));
        setIsConfirmDeleteModal(false);
        setIsFavorite(false);
        colorSchemeEl.current.style.opacity = 1;    
      }, 800);
    }
    else {
      setIsFavorite(false);
      dispatch(deleted({schemeId:currScheme.id}));
      setIsConfirmDeleteModal(false);
    }
  }

  function launchSchemeToGenerator() {
    if(schemeCategory === 'favorite') {
      setIsLaunchEditModal(false);
      schemeCtx.setIsFavoritesModal(false);
      schemeCtx.loadScheme(scheme.swatch, scheme.type, scheme.numb, true);
    }
    
    if(schemeCategory !== 'favorite') {
      schemeCtx.loadScheme(scheme.swatch, scheme.type, scheme.numb);
      setIsLaunchEditModal(false);
    } 
  }
 
  function launchCodeModal() {
    const schemeCode = {swatches:isSorted ? sortedSwatches: swatches, type:scheme.type, format:format, category:schemeCategory}
    schemeCtx.setCodeModal(schemeCode);
  }

  return (
      <div className={`color-scheme ${schemeCategory==='generator' ? 'color-scheme--generator' : ''} color-scheme--${scheme.type}`} ref={colorSchemeEl} >
      <ul className="color-scheme-swatches">
        {renderSwatches}
      </ul> 
      {!isConfirmDeleteModal &&
      <div className='color-scheme-footer'>
          <div className='color-scheme-footer-type'>
            {scheme.type}
          </div>
          <div className={`color-scheme-footer-btns ${(schemeCategory==='generator' && !schemeCtx.isValidSwatch) ? 'color-scheme-footer-btns--invisible ': ''}`}>
            { (scheme.type === 'monochromatic' 
              || scheme.type === 'analogous'
              || scheme.type === 'polyad'
            ) && schemeCategory==='generator' &&
            <>
            <ButtonIcon imgUrl={minus} action={schemeCtx.toggleSwatch} actionArgs={'removeSwatch'} isDisabled={schemeCtx.isBtnRemoveDisabled} />   
            <ButtonIcon imgUrl={plus} action={schemeCtx.toggleSwatch} actionArgs={'addSwatch'} isDisabled={schemeCtx.isBtnAddDisabled} />             
            </>
            }
          {  schemeCategory === 'generator' && (scheme.type === 'analogous' || scheme.type === 'polyad' || scheme.type === 'monochromatic') && 
            <ButtonIcon imgUrl={isSorted ? unsort : sort} action={setIsSorted} actionArgs={isSorted ? false : true}/> 
          }
          { schemeCategory !=='favorite' && 
          <ButtonIcon imgUrl={isFavorite ? heartFull : heart} action={isFavorite ? removeFromFavorites : addToFavorites} />             
          }
            { schemeCategory ==='favorite' && 
              <ButtonIcon imgUrl={trashDark} action={setIsConfirmDeleteModal} actionArgs={true} />  
            }
              <ButtonIcon imgUrl={download}  action={launchCodeModal} /> 
            {
              schemeCategory !== 'generator' && 
              <ButtonIcon imgUrl={launch}  action={setIsLaunchEditModal} actionArgs={true}  />  
            }
          </div>            
      </div>
      }
      {isConfirmDeleteModal && 
        <div className='color-scheme-footer color-scheme-footer--delete'>
          <div className='color-scheme-footer--delete-btns'>
            <button className='btn-outline btn-outline--small btn-outline--danger'
            onClick={() => setTimeout(() => {removeFromFavorites()}, 100)}>remove</button>
            <button className='btn-outline btn-outline--small btn-outline--primary'
            onClick={() => setTimeout(() => {setIsConfirmDeleteModal(false)}, 100)}>cancel</button>
          </div>
        </div>
      }   
      {isLaunchEditModal && 
        <div className='color-scheme-edit'>
          <div className="color-scheme-edit-message">
          Do you want to edit this scheme?
          </div>
            <div className="color-scheme-edit-footer">
              <button className='btn-outline btn-outline--small btn-outline--primary' onClick={() => setIsLaunchEditModal(false)}>ESC</button>
              <button className='btn-outline btn-outline--small btn-outline--success' onClick={launchSchemeToGenerator} >EDIT</button>
            </div>
        </div>
      }
    </div>
  )
}

export default ColorSchemeTest