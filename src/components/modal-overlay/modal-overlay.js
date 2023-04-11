import React from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

export default function ModalOverlay({ closeModal }) {
  return <div className={styles.overlay} onClick={closeModal}></div>;
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
