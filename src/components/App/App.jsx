import PropTypes from 'prop-types';
import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
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

export class App extends Component {
  static propTypes = {
    state: PropTypes.shape({
      imagesName: PropTypes.string.isRequired,
      images: PropTypes.array.isRequired,
      page: PropTypes.number.isRequired,
      totalHits: PropTypes.number.isRequired,
      error: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    }),
  };

  state = {
    imagesName: '',
    images: [],
    page: 1,
    totalHits: null,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(_, prevState) {
    const prevName = prevState.imagesName;
    const nextName = this.state.imagesName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    // if (prevName !== nextName) {
    //   this.setState({
    //     page: 1,
    //     images: [],
    //     status: 'idle',
    //   });
    // }

    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({
        page: 1,
        images: [],
        status: 'idle',
      });
      this.getImages(nextName, nextPage);
    }
  }

  getImages = async (nextName, page) => {
    if (!nextName) {
      return;
    }
    try {
      this.setState({ status: 'pending' });
      const {
        hits,
        total,
        totalHits,
        // page: currentPage,
      } = await fetchImages(nextName, page);
      if (hits.length === 0) {
        this.setState({ status: 'idle' });
        return;
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        total,
        totalHits,
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  handleSearchFormSubmit = imagesName => {
    this.setState({ imagesName });
  };

  btnLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, error, status, totalHits, imagesName } = this.state;

    if (status === 'idle') {
      return (
        <Section>
          <Searchbar onSubmit={this.handleSearchFormSubmit} />
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
          <Searchbar onSubmit={this.handleSearchFormSubmit} />
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
          <Searchbar onSubmit={this.handleSearchFormSubmit} />
          <Container>
            <ImageGallery imagesName={imagesName} images={images} />
          </Container>
          {images.length < totalHits && <LoadMore onClick={this.btnLoadMore} />}
          <ToastContainer autoClose={3000} />
        </Section>
      );
    }
  }
}
