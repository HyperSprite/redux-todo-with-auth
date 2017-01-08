import React, { PropTypes } from 'react';
import { IconButton } from 'material-ui';
import { ActionFavorite, ActionFavoriteBorder } from 'material-ui/svg-icons';

import style from '../../styles/style';

const propTypes = {
  authenticated: PropTypes.bool,
  fav: PropTypes.bool,
  favCount: PropTypes.number,
  favClick: PropTypes.func,
};

const favIconButton = (authenticated, fav, favCount, favClick) => {
  if (authenticated) {
    return (fav ? (
      <IconButton
        tooltip={`You + ${favCount - 1}`}
        tooltipPosition="top-right"
        touch
        style={style.favButton}
        onClick={favClick}
      >
        <ActionFavorite />
      </IconButton>
    ) : (
      <IconButton
        touch
        tooltip={`${favCount}`}
        tooltipPosition="top-right"
        style={style.favButton}
        onClick={favClick}
      >
        <ActionFavoriteBorder />
      </IconButton>
    ));
  }
  return (
    <IconButton
      disabled
      tooltipPosition="top-right"
      style={style.favButton}
    >
      <ActionFavoriteBorder />
    </IconButton>
  );
};

favIconButton.propTypes = propTypes;

export default favIconButton;
