import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import  '../ImageGallery/ImageGallery.css';


const ImageGallery = ({ items, onImageClick }) => {
  return (
    <ul className="gallery">
      {items.map((item, index) => (
        <ImageGalleryItem
          key={`${item.id}_${index}`}
          image={item}
          onImageClick={onImageClick}
        />
      ))}
    </ul>
  );
  };

ImageGallery.propTypes = {
  // items: PropTypes.array.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onImageClick: PropTypes.func.isRequired,
};


export default ImageGallery;

