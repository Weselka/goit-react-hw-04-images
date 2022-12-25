import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalBox } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    state: PropTypes.shape({
      handleKeyDown: PropTypes.func.isRequired,
      handleOverlayClick: PropTypes.func.isRequired,
    }),
    children: PropTypes.object.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  // handleOverlayClick = e => {
  //   if (e.currentTarget !== e.target) {
  //     this.props.onClose();
  //   }
  // };

  render() {
    const { children } = this.props;
    return createPortal(
      <Overlay onClick={this.handleOverlayClick}>
        <ModalBox>{children}</ModalBox>
      </Overlay>,
      modalRoot
    );
  }
}
