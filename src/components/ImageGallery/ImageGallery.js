import PropTypes from 'prop-types';
import { Component } from 'react';
import { ImageGalleryItem } from 'components';
import { ImageGalleryList } from './ImageGallery.styled';

export class ImageGallery extends Component {
  render() {
    const { images } = this.props;

    return (
      <ImageGalleryList>
        {images.map(image => (
          <ImageGalleryItem key={image.id} image={image}></ImageGalleryItem>
        ))}
      </ImageGalleryList>
    );
  }
}

ImageGallery.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};
