import { schemeTypes } from '../../assets/js/colorMethods';

function SchemeTypeModal({ schemeType, setIsModal, setSchemeType }) {

  const renderInputs = schemeTypes.map((type, index) => {

    return  <div className="input-group" key={index}>
              <input type="radio" name="schemeType" value={type} id={type} 
                checked={schemeType === type}
                onChange={(e) => setSchemeType(e.target.value)}
              />
              <label htmlFor="monochromatic">{type}</label>
            </div>
  });

  return (
    <div className='modal modal-type'>
        <div className="modal-header modal-type-header">
          scheme types
        <button className="btn btn-close btn-close--light modal-header-btn modal-confirm-header-btn" onClick={() => setIsModal(false)}>X</button>
        </div>
        <div className="modal-body modal-type-body">
           <div className="modal-type-body-options">
            {renderInputs }
           </div>
        </div>
    </div>
  )
}

export default SchemeTypeModal