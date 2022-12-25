import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { AiOutlineSearch } from 'react-icons/ai';
import { theme } from '../../styles/theme';

import {
  SearchbarHeader,
  FormBlock,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  static propTypes = {
    state: PropTypes.shape({
      imagesName: PropTypes.string.isRequired,
      handleChange: PropTypes.func.isRequired,
      handleSubmit: PropTypes.func.isRequired,
    }),
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    imagesName: '',
  };

  handleChange = e => {
    this.setState({ imagesName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { imagesName } = this.state;
    const { onSubmit } = this.props;

    if (imagesName.trim() === '') {
      return toast.error('Enter a name');
    }
    onSubmit(imagesName);
    this.setState({ imagesName: '' });
  };

  render() {
    const { imagesName } = this.state;
    return (
      <SearchbarHeader>
        <FormBlock onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <AiOutlineSearch fill={theme.fills.dark} />
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>
          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={imagesName}
            onChange={this.handleChange}
            name="name"
          />
        </FormBlock>
      </SearchbarHeader>
    );
  }
}
