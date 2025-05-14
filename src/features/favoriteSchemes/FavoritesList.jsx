import { useSelector } from "react-redux";
import { selectAllFavoriteSchemes } from "../../features/favoriteSchemes/favoritesSlice"; 
import ColorScheme from '../../components/color-scheme/ColorScheme';

function FavoritesList() {

    const favoriteSchemes = useSelector(selectAllFavoriteSchemes);

    const renderSchemes = favoriteSchemes.slice().reverse().map((scheme, index) => {
        return <ColorScheme key={index} scheme={scheme} schemeCategory='favorite' /> 
    })

  return (
    <>
        {favoriteSchemes.length > 0 && <div className="favorite-schemes-body-list">{renderSchemes}</div> }
        {favoriteSchemes.length === 0 && <p className='favorite-schemes-body-message'>{`you haven't saved any scheme yet`}</p>}
    </>
  )
}

export default FavoritesList