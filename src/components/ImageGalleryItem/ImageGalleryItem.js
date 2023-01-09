import PropTypes from 'prop-types';
import { useState } from 'react';
import { ImageGalleryLi, ImageGalleryImage } from './ImageGalleryItem.styled';
import { Modal } from 'components';

export const ImageGalleryItem = ({ image }) => {

  const [showModal, setshowModal] = useState(false);

  const toggleModal = () => {
    setshowModal(!showModal);
  };

  return (
    <ImageGalleryLi key={image.id} onClick={toggleModal}>
      <ImageGalleryImage
        src={image.webformatURL}
        alt={image.tags}
        width="240"
        loading="lazy"
      ></ImageGalleryImage>
      {showModal && (
        <Modal onClose={toggleModal}>
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