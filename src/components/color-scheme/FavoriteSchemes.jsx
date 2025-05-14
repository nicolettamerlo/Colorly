import { useContext, useRef, useState } from "react";
import FavoritesList from '../../features/favoriteSchemes/FavoritesList';
import { close, trash, arrowUp } from '../../services/icons';
import { useDispatch } from "react-redux";
import { deletedAll } from "../../features/favoriteSchemes/favoritesSlice";
import ButtonIconBg from "../buttons/ButtonIconBg";
import { SchemeContext } from "../../pages/SchemesGeneratorPage";

function FavoriteSchemes() {


  const schemeCtx = useContext(SchemeContext);

  const [isConfirmDeleteModal, setIsConfirmDeleteModal] = useState(false);
  const body = useRef(null);
  const modalEl = useRef(null)
  const dispatch = useDispatch();

  function deleteAllFavoriteSchemes() {
    body.current.style.opacity = 0;
    setIsConfirmDeleteModal(false);
    setTimeout(() => {
      dispatch(deletedAll()); 
      localStorage.setItem('favoriteSchemes', []);
      body.current.style.opacity = 1;
    }, 1200); 
  }

  function closeModal() {
    modalEl.current.style.opacity = 0;
    setTimeout(() => {
      schemeCtx.closeFavoriteSchemesModal();
    }, 600);
  }

  function scrollIntoView() {
    body.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
      <div className='favorite-schemes' ref={modalEl}>
          <div className="favorite-schemes-header">
            <h3 className='favorite-schemes-header-title'>Your favorite color schemes</h3>
            <ButtonIconBg imgUrl={close} action={closeModal} bgColor={'white'} extraCls={'favorite-schemes-header-btn--close'} />  
          </div>
          <div className="favorite-schemes-body" ref={body}>
              <FavoritesList />
          </div>
          <div className="favorite-schemes-footer">
            <ButtonIconBg imgUrl={trash} action={setIsConfirmDeleteModal} bgColor={'white'} actionArgs={true} />
            <ButtonIconBg imgUrl={arrowUp} action={scrollIntoView} bgColor={'white'} /> 
          </div>
          {isConfirmDeleteModal && 
            <div className="modal-header modal-delete-all-confirm">
              <div className="modal-header">
                delete all favorite schemes
              <button className="btn btn-close btn-close--light modal-header-btn modal-confirm-header-btn" onClick={() => setIsConfirmDeleteModal(false)}>X</button>
              </div>
              <div className="modal-body">Do you really want to <span>delete</span> all your favorites schemes?</div>
              <div className="modal-footer">
                <div className="modal-footer-options">
                  <button className='btn-outline btn-outline--danger' onClick={deleteAllFavoriteSchemes}>delete</button>
                  <button className='btn-outline btn-outline--primary' onClick={() => setIsConfirmDeleteModal(false)}>cancel</button>
                </div>
            </div>
            </div>
          }
      </div>     
  )
}

export default FavoriteSchemes