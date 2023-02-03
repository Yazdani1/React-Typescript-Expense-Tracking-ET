import React, { FC, ReactNode } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import modalBoxStyle from "./ModalBox.module.scss";
import confirmModalStyle from "./ConfirmModal.module.scss";

interface ConfirmModalProps {
  open: boolean;
  onCloseModal: () => void;
  title?: string;
  children: ReactNode;
  discardPost?: () => void;
  keepAddingExpenseBook?: () => void;
  showDiscardButton?: boolean;
  showDeleteButton?: boolean;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  open,
  onCloseModal,
  title,
  children,
  discardPost,
  keepAddingExpenseBook,
  showDiscardButton,
  showDeleteButton,
}) => {
  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      center
      classNames={{
        overlay: `${modalBoxStyle.customOverlay}`,
        modal: `${modalBoxStyle.customModal}`,
      }}
    >
      <div className={confirmModalStyle.confirmModalTitle}>
        <h5>{title}</h5>
      </div>
      <hr />
      <div className={confirmModalStyle.confirmModalMainChildren}>
        {children}
      </div>

      {showDiscardButton && (
        <div className={modalBoxStyle.modalActionButton}>
          <button className="btn btn-info" onClick={keepAddingExpenseBook}>
            Keep
          </button>
          <button className="btn btn-danger" onClick={discardPost}>
            Discard
          </button>
        </div>
      )}

      {showDeleteButton && (
        <div className={modalBoxStyle.modalActionButton}>
          <button className="btn btn-info">Cancel</button>
          <button className="btn btn-danger">Delete</button>
        </div>
      )}
    </Modal>
  );
};

export default ConfirmModal;
