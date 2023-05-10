import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { DELETE_INGREDIENT_DETAILS } from "../../services/actions/ingredient-details";

const modalRoot = document.getElementById("modals");

const Modal = ({ children, header, boxStyles, setVisible }) => {
  const dispatch = useDispatch();

  const closeByEscape = (evt) => {
    if (evt.key === "Escape") {
      closeModal();
    }
  };

  const closeModal = () => {
    setVisible(false);
    dispatch({ type: DELETE_INGREDIENT_DETAILS });
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
          <h3 className="text text_type_main-large"> {header} </h3>
          <button className={modalStyles.header__button} onClick={closeModal}>
            <CloseIcon type="primary" />
          </button>
        </div>
        <div className={modalStyles.content}>{children}</div>
      </div>
    </>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  header: PropTypes.string.isRequired,
  boxStyles: PropTypes.string.isRequired,
  setVisible: PropTypes.func.isRequired,
};
