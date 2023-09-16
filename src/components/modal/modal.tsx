import React, { FC, ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("modals");

interface IModalProps {
  children: ReactNode;
  header: string;
  boxStyles: string;
  onClose: () => void;
}

const Modal: FC<IModalProps> = ({ children, header, boxStyles, onClose }) => {
  const closeByEscape = (evt: KeyboardEvent) => {
    if (evt.key === "Escape") {
      closeModal();
    }
  };

  const closeModal = () => {
    onClose();
  };

  useEffect(() => {
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  });

  return ReactDOM.createPortal(
    <>
      <ModalOverlay closeModal={closeModal} />
      <div className={`${modalStyles.container} ${boxStyles}`}>
        <div className={modalStyles.header}>
          <h3
            className={`text ${
              /\d/.test(header)
                ? "text_type_digits-default"
                : "text_type_main-large"
            }`}
          >
            {" "}
            {header}{" "}
          </h3>
          <button className={modalStyles.header__button} onClick={closeModal}>
            <CloseIcon type="primary" />
          </button>
        </div>
        <div className={modalStyles.content}>{children}</div>
      </div>
    </>,
    modalRoot!
  );
};

export default Modal;
