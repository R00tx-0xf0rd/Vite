import styles from "./styles.module.css";

const Modal = ({ children, onClose, header}) => {
  return (
    <div className={styles.wrapper} onClick={() => onClose()}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles["modal-content"]}>
          <div className={styles.header}>
            <h3>{header}</h3>
            <div className={styles.closeBtn} onClick={() => onClose()}>
              &#10006;
            </div>
          </div>
          <div className={styles["modal-body"]}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
