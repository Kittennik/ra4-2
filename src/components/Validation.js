import React from 'react';
import PropTypes from 'prop-types';

export default function Validation(props) {
  const { msg } = props;

  return (
    <div className="validate">
      <p>{msg}</p>
    </div>
  );
}

Validation.propTypes = {
  msg: PropTypes.string.isRequired,
};
