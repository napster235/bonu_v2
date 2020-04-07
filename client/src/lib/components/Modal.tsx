import React, { FunctionComponent } from 'react';

// MUI Components
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MuiModal, { ModalProps as MuiModalProps } from '@material-ui/core/Modal';


interface ModalProps extends MuiModalProps {
  title: string;
  classNames?: string;
  closeButton?: boolean;
  onClose?: ()=> void;

}

const useStyles = makeStyles((theme: Theme) => createStyles({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 480,
    backgroundColor: '#424242',
    borderRadius: '0.25rem',
    boxShadow: theme.shadows[5],
  },
  modalHeader: {
    padding: theme.spacing(2, 3),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: '1.5rem',
    lineHeight: '2.5rem',
    margin: 0,
  },
  modalCloseButton: {
    color: '#f9fafc',
    minWidth: 'auto',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    height: '2rem',
    width: '2rem',
  },
  modalBody: {
    padding: theme.spacing(2, 3),
  },
  modalBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.85) !important',
  },
}));

/**
 * TS
 * ```
 * const [open, setOpen] = useState<boolean>(false);
 * const handleOpen = () => setOpen(true);
 * const handleClose = () => setOpen(false);
 * ```
 * TSX
 * ```
 * <Button onClick={handleOpenModal}>Open</Button>
 * <Modal
 *    title="Informative title"
 *    onClose={handleCloseModal}
 *  >
 *   <div>Modal body content</div>
 * </Modal>
 * ```
 */

const Modal:FunctionComponent<ModalProps> = (props) => {
  const {
    open, title, children, closeButton, onClose,
  } = props;

  const classes = useStyles();

  return (
    <MuiModal
      open={open}
      aria-labelledby="modal-title" // A11y
      BackdropProps={{
        className: classes.modalBackdrop,
      }}
      onClose={onClose}
    >
      <div className={classes.modal}>
        <div className={classes.modalHeader}>
          <h3 className={classes.modalTitle} id="modal-title">
            {title}
          </h3>
          { closeButton && (
            <Button
              className={classes.modalCloseButton}
              onClick={onClose}
            >
              x
            </Button>
          )}
        </div>
        <div className={classes.modalBody}>
          {children}
        </div>
      </div>
    </MuiModal>
  );
};

export default Modal;