import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';

  

const ImageGalleryItem = ({ image, onImageClick }) => {
  const [showModal, setShowModal] = useState(false);

 
  const handleImageClick = () => {
    setShowModal(true);
    onImageClick(image.largeImageURL);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <li className="gallery-item">
      <img
        className="gallery-item-image"
        src={image.webformatURL}
        alt="img"
        onClick={handleImageClick}
      />
      {showModal && (
        <Modal
          image={image.largeImageURL}
          onClose={handleCloseModal} />
      )}
    </li>
  );
  }

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
