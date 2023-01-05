import { useState } from 'react';
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

export const Searchbar = ({onSubmit}) => {
  const [imagesName, setImagesName] = useState('');

  const handleChange = e => {
    setImagesName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();    

    if (imagesName.trim() === '') {
      return toast.error('Enter a name');
    }
    onSubmit(imagesName);
    setImagesName('');
  };

    return (
      <SearchbarHeader>
        <FormBlock onSubmit={handleSubmit}>
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
            onChange={handleChange}
            name="name"
          />
        </FormBlock>
      </SearchbarHeader>
    );
}
  
  Searchbar.propTypes = {
    state: PropTypes.shape({
      imagesName: PropTypes.string.isRequired,
      handleChange: PropTypes.func.isRequired,
      handleSubmit: PropTypes.func.isRequired,
    }),
    onSubmit: PropTypes.func.isRequired,
  };
