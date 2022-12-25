import PropTypes from 'prop-types';
import { ErrorText, ErrorBox } from './ImageError.styled';

export const ImageError = ({ message }) => {
  return (
    <ErrorBox role="alert">
      <ErrorText>
        No photo was found for your request, please try again!
      </ErrorText>
    </ErrorBox>
  );
};

ImageError.propTypes = {
  message: PropTypes.string.isRequired,
};
