import React from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

export default function ModalOverlay(props) {
    return (
        <div className={styles.overlay} onClick={() => props.setVisible(false)}>
            {props.children}
        </div>
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.element.isRequired
}