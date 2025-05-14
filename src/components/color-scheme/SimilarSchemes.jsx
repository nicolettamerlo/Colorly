import { useContext } from 'react'
import { getSimilarSwatches } from '../../assets/js/colorMethods';
import { SchemeContext } from '../../pages/SchemesGeneratorPage';
import ColorScheme from './ColorScheme';

function SimilarSchemes() {

  const schemeCtx = useContext(SchemeContext);


  const similarSwatches = getSimilarSwatches(schemeCtx.curColor, schemeCtx.curType);

    const renderSimilarSchemes = similarSwatches.map((swatch, index) => {
      return <ColorScheme key={index} scheme={{swatch:swatch, type:schemeCtx.curType, numb:schemeCtx.curNumb}} />
    }) 

  return (
    <div className="page-container similar-schemes">
    <h3 className='similar-schemes-title'>similar schemes</h3>
    <div className="similar-schemes-list">
      {renderSimilarSchemes}
    </div>
  </div>
  )
}

export default SimilarSchemes