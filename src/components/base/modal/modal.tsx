import {FC, ReactNode, useEffect} from "react";
import {createPortal} from "react-dom";
import styles from "./modal.module.css";

import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay/modal-overlay.tsx";

interface IModal {
    title?: string
    children: ReactNode;
    onClose: () => void
}

const Modal: FC<IModal> = (props) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent): void => {
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
        <div className={styles.wrapper} data-testId="modal">
            <div className={`${styles.container} p-10 pb-15`}>
                <header className={styles.header}>
                    {props.title && (
                        <p className="text text_type_main-medium">{props.title}</p>
                    )}

                    <button className={styles["close-button"]} data-testId="close-button" onClick={props.onClose}>
                        <CloseIcon type="primary"/>
                    </button>
                </header>

                <div className={styles.content}>{props.children}</div>
            </div>

            <ModalOverlay onClick={props.onClose}/>
        </div>,
        document.getElementById("modals") as Element
    );
};

export default Modal;
