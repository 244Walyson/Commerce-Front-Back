import ButtonPrimary from '../ButtonPrimary';
import './styles.css'

type props = {
    message: string;
    onDialogClose: () => void;
}

const ModalAlert = ({message, onDialogClose}: props) => {
  

    return (
    <div className="dsc-dialog-backgroud" onClick={() => onDialogClose()}>
        <div className='dsc-dialog-box' onClick={(e) => e.stopPropagation()}>
            <h2>{message}</h2>
           <div onClick={() => onDialogClose()} className='button-close-box'> <ButtonPrimary text='Ok'></ButtonPrimary></div>
        </div>
    </div>
  )
}

export default ModalAlert