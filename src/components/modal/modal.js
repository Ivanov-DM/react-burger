import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

const modalRoot = document.getElementById('modals');

const Modal = ({children, header, boxStyles, setVisible}) => {

    const closeByEscape = (evt) => {
        if (evt.key === 'Escape') {
            setVisible(false);
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', closeByEscape);
        return () => document.removeEventListener('keydown', closeByEscape)
    }, [])

    return ReactDOM.createPortal(
        (
            <ModalOverlay setVisible={setVisible}>
                <div className={`${modalStyles.container} ${boxStyles}`} onClick={e => e.stopPropagation()}>
                    <div className={modalStyles.header}>
                        <h3 className="text text_type_main-large"> {header} </h3>
                        <button className={modalStyles.header__button} onClick={() => setVisible(false)}>
                            <CloseIcon type="primary"/>
                        </button>
                    </div>
                    <div className={modalStyles.content}>
                        {children}
                    </div>
                </div>
            </ModalOverlay>
        ),
        modalRoot
    )
}

export default Modal;

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    header: PropTypes.string.isRequired,
    boxStyles: PropTypes.string.isRequired,
    setVisible: PropTypes.func.isRequired
}