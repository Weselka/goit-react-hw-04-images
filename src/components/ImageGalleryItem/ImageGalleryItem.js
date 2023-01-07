import PropTypes from 'prop-types';
import { useState } from 'react';
import { ImageGalleryLi, ImageGalleryImage } from './ImageGalleryItem.styled';
import { Modal } from 'components';

export const ImageGalleryItem = ({ image }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const selectImage = largeImageURL => {
    setSelectedImage(largeImageURL);
  };

  const closeModal = () => {
    setSelectedImage(!selectedImage);
  };

  return (
    <ImageGalleryLi key={image.id} onClick={() => selectImage(image)}>
      <ImageGalleryImage
        src={image.webformatURL}
        alt={image.tags}
        width="240"
        loading="lazy"
      ></ImageGalleryImage>
      {selectedImage && (
        <Modal onClose={closeModal}>
          <img key={image.id} src={image.largeImageURL} alt={image.tags}></img>
        </Modal>
      )}
    </ImageGalleryLi>
  );
};

ImageGalleryItem.propTypes = {
  state: PropTypes.shape({
    selectImage: PropTypes.func.isRequired,
  }),
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};