import styles from './modal-overlay.module.css';
import {FC} from "react";

interface IModalOverlay {
    onClick: () => void;
}

const ModalOverlay: FC<IModalOverlay> = ({onClick}) => {
    return <div className={styles.overlay} data-testId="modal-overlay" onClick={onClick}/>;
};

export default ModalOverlay;
