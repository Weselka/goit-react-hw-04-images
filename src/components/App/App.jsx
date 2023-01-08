import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from '../../services/Images-api';
import { Section, ErrorText, ErrorBox, Loader } from 'components';

import {
  Container,
  Searchbar,
  ImageGallery,
  LoadMore,
  ImageError,
} from 'components';

export const App = () => {
  const [imagesName, setImagesName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  
  useEffect(() => {
    const getImages = async (imagesName, page) => {
      if (imagesName === '') {
        return;
      }
      try {
        setStatus('pending');
        const {
          hits,
          // total,
          totalHits,
        } = await fetchImages(imagesName, page);
        if (hits.length === 0) {
          toast.info('No images were found for your request');
          setStatus('idle');
          return;
        }
        setImages(prevState => [...prevState, ...hits]);
        // setPage(prevPage => prevPage + 1);
        setTotalHits(totalHits);
        setStatus('resolved');
      } catch (error) {
        setError('rejected');
      }
    };
    getImages(imagesName, page);
  }, [imagesName, page]);

  const handleSearchFormSubmit = imagesName => {
    setImagesName(imagesName);
    setPage(1);
    setImages([]);
    setStatus('idle');
  };

  const btnLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (status === 'idle') {
    return (
      <Section>
        <Searchbar onSubmit={handleSearchFormSubmit} />
        <ErrorBox>
          <ErrorText>Add a photo to view or enter another name</ErrorText>
        </ErrorBox>
        <ToastContainer autoClose={3000} />
      </Section>
    );
  }
  if (status === 'pending') {
    return (
      <Section>
        <Loader />
      </Section>
    );
  }
  if (status === 'rejected') {
    return (
      <Section>
        <Searchbar onSubmit={handleSearchFormSubmit} />
        <Container>
          <ImageError message={error.message}>{error.message}</ImageError>
        </Container>
        <ToastContainer autoClose={3000} />
      </Section>
    );
  }
  if (status === 'resolved') {
    return (
      <Section>
        <Searchbar onSubmit={handleSearchFormSubmit} />
        <Container>
          <ImageGallery imagesName={imagesName} images={images} />
        </Container>
        {images.length < totalHits && <LoadMore onClick={btnLoadMore} />}
        <ToastContainer autoClose={3000} />
      </Section>
    );
  }
};

App.propTypes = {
  state: PropTypes.shape({
    imagesName: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    totalHits: PropTypes.number.isRequired,
    error: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
};
