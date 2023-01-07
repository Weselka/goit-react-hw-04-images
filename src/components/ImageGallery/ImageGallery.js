import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components';
import { ImageGalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <ImageGalleryList>
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image}></ImageGalleryItem>
      ))}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};
