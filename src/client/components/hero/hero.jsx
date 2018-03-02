import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  backgroundImageNarrow: PropTypes.string,
  backgroundImageWide: PropTypes.string,
  children: PropTypes.node,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

const defaultProps = {
  backgroundImageNarrow: '',
  backgroundImageWide: '',
  children: null,
  height: '80vh',
};

const ExtHero = (props) => {
  const backgroundImage = (props.containerWidth < 769) ?
    `url('${props.backgroundImageNarrow}')` :
    `url('${props.backgroundImageWide}')`;
  return (
    <div
      style={{
        backgroundImage,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom center',
        height: props.height,
      }}
    >
      {props.children}
    </div>
  );
};

ExtHero.propTypes = propTypes;
ExtHero.defaultProps = defaultProps;

export default ExtHero;
