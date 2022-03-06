/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Component } from "react";
import styles from "./ImageGalleryItem.module.css";
import Modal from "../Modal/Modal";
import PropTypes from "prop-types";
export default class GalleryItem extends Component {
  state = { isOpen: false };

  modalToggle = (e) => {
    e.stopPropagation();
    this.setState({ isOpen: !this.state.isOpen });
  };
  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.setState({ isOpen: false });
    }
  };
  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    window.addEventListener("keydown", this.handleKeyDown);
    return (
      <div>
        <li className={styles.ImageGalleryItem} onClick={this.modalToggle}>
          <img
            src={webformatURL}
            alt={tags}
            className={styles.ImageGalleryItem__image}
          />
        </li>
        {this.state.isOpen && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            modalToggle={this.modalToggle}
            
          />
        )}
      </div>
    );
  }
}
GalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string
};