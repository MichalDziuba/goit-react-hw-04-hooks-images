/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { Component } from "react";
import styles from "./ImageGalleryItem.module.css";
import Modal from "../Modal/Modal";
import PropTypes from "prop-types";

export default function GalleryItem(props) {
  const [isOpen, setModal] = useState(false);
function modalToggle (e){
  e.stopPropagation();
  setModal(!isOpen)
  };
function handleKeyDown (e) {
    if (e.code === "Escape") {
      setModal(false) 
    }
  };
  const { webformatURL, largeImageURL, tags } = props;
  window.addEventListener("keydown", handleKeyDown);
  
  return (
      <div>
        <li className={styles.ImageGalleryItem} onClick={modalToggle}>
          <img
            src={webformatURL}
            alt={tags}
            className={styles.ImageGalleryItem__image}
          />
        </li>
        {isOpen && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            modalToggle={modalToggle}
            
          />
        )}
      </div>
    )
}
// export default class GalleryItem extends Component {
  

  
  
//   render() {
   
//     return (
//       <div>
//         <li className={styles.ImageGalleryItem} onClick={this.modalToggle}>
//           <img
//             src={webformatURL}
//             alt={tags}
//             className={styles.ImageGalleryItem__image}
//           />
//         </li>
//         {this.state.isOpen && (
//           <Modal
//             largeImageURL={largeImageURL}
//             tags={tags}
//             modalToggle={this.modalToggle}
            
//           />
//         )}
//       </div>
//     );
//   }
// }
GalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string
};