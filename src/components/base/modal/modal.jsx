import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay/modal-overlay";

const Modal = (props) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        props.onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [props]);

  return createPortal(
    <div className={styles.wrapper}>
      <div className={`${styles.container} p-10 pb-15`}>
        <header className={styles.header}>
          {props.title && (
            <p className="text text_type_main-medium">{props.title}</p>
          )}

          <button className={styles["close-button"]} onClick={props.onClose}>
            <CloseIcon type="primary" />
          </button>
        </header>

        <div className={styles.content}>{props.children}</div>
      </div>

      <ModalOverlay onClick={props.onClose} />
    </div>,
    document.getElementById("modals")
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
