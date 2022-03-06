import React from "react";
import style from './Modal.module.css'
import PropTypes from "prop-types";
const Modal = ({ largeImageURL, tags, modalToggle, }) => (
  <div className={style.Overlay} onClick={modalToggle} >
    <div className={style.Modal}>
      <img src={largeImageURL} alt={tags} />
    </div>
  </div>
);
export default Modal;
Modal.propTypes = {
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
  modalToggle: PropTypes.func,
  
}