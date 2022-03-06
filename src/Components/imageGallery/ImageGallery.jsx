import React from "react";
import styles from "./ImageGallery.module.css";
import GalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import { BsEmojiFrown } from 'react-icons/bs'
import PropTypes from "prop-types";
const ImageGallery = ({ items }) => {
  return (
    <div className={styles.Gallery}>
      {items.length > 0 ? (
        <ul className={styles.ImageGallery}>
          {items.map(({ id, webformatURL, largeImageURL, tags }) => (
            <GalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.Info}>
          Sorry, there are no images matching your search query. Please try
          again. <BsEmojiFrown />
        </p>
      )}
    </div>
  );
};
ImageGallery.propTypes = {
  items: PropTypes.array
}
export default ImageGallery;
