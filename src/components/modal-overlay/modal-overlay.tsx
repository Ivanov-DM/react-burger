import React from "react";
import styles from "./modal-overlay.module.css";

interface IModalOverlayProps {
  closeModal: () => void;
}

export default function ModalOverlay({ closeModal }: IModalOverlayProps) {
  return <div className={styles.overlay} onClick={closeModal}></div>;
}
