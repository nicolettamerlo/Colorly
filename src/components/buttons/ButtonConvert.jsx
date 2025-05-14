import { rotate } from '../../services/icons';
import ButtonIcon from './ButtonIcon';

function ButtonConvert({ action, actionArgs=null, isDisabled=false, size='default'}) {
  return (
    <div className={`btn-convert btn-convert--${size} ${isDisabled ? 'btn-convert--disabled' : ''} `}>
        <ButtonIcon imgUrl={rotate} action={action} actionArgs={actionArgs} />
      <div className="btn-convert-label">convert</div>
  </div>
  )
}

export default ButtonConvert