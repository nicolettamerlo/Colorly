

function Swatchbook({swatches, setSelectedSwatch, setIsSwatchbook, themeMode}) {

  const renderSwatches = swatches.map((swatch, index) => {
    return <button className="swatch" style={{backgroundColor:swatch}} key={index} onClick={() => setSelectedSwatch(swatch)}></button>
  })

  return (
    <div className={`modal modal--${themeMode} modal-swatchbook modal-swatchbook--${themeMode}`}>
        <div className="modal-header">
            Recent Swatches
            <button className="btn modal-header-btn" onClick={() => setIsSwatchbook(false)}>X</button>
        </div>
        <div className="modal-body swatchbook">
            {renderSwatches}
        </div>
    </div>
  )
}

export default Swatchbook