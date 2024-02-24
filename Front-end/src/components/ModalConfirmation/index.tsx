import ButtonPrimary from '../ButtonPrimary';
import './styles.css'

type prop = {
    message: string;
    id: number;
    onDialogClose: () => void;
    onConfirmationDialog: (bool: boolean, id: number) => void;
}

const ModalConfirmation = ({message, onDialogClose, id,onConfirmationDialog}: prop) => {
   
    const handleClickCancelConfirmation = () => {
        onConfirmationDialog(false, id)
        onDialogClose()
    }

    const handleConfirmDialog = () => {
        onConfirmationDialog(true, id)
        onDialogClose()
    }

    return (
        <div className="dsc-dialog-backgroud" onClick={() => onDialogClose()}>
            <div className='dsc-dialog-box' onClick={(e) => e.stopPropagation()}>
                <h2>{message}</h2>
                <div className='button-select-box'>
                <button className='button-cancel-delete' onClick={handleClickCancelConfirmation}>Cancelar</button>
                <div onClick={handleConfirmDialog} className='button-confirm-delete'><ButtonPrimary text='Confirmar'></ButtonPrimary></div>
                </div>
            </div>
        </div>
    )
}

export default ModalConfirmation