import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ onClick }) => {
  return (
    <button className="load-more-button" onClick={onClick}>
      Load More
    </button>
  );
};

Button.propTypes = {
   onClick: PropTypes.func,
};

export default Button;

