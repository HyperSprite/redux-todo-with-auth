import React from 'react';
import PropTypes from 'prop-types';
import MagnifyIcon from 'mdi-react/MagnifyIcon';

import ButtonBase from '../base';

/**

import ButtonSearch from '../button/search';

* Required only props

<ButtonSearch
  onClick={handleClose}
/>

*
* All Props

<ButtonSearch
  onClick={handleClose}
  color="primary"
  label="Search"
  size="small"
  toolTip="Search Activities"
  toolTipId="tooltip-search"
  toolTipPlacement="left"
  variant="raised"
/>

*/

const propTypes = {
  classes: PropTypes.object, // eslint-disable-line
  /** enum: 'default', 'inherit', 'primary', 'secondary' */
  color: PropTypes.string,
  /** Label for button */
  label: PropTypes.string,
  /** onClick handler */
  onClick: PropTypes.func,
  /** enum: 'small', 'medium', 'large' */
  size: PropTypes.string,
  /** ToolTip text */
  toolTip: PropTypes.string,
  toolTipId: PropTypes.string,
  /** enum: 'bottom-end', 'bottom-start', 'bottom', 'left-end',
            'left-start', 'left', 'right-end', 'right-start',
            'right', 'top-end', 'top-start', 'top' */
  toolTipPlacement: PropTypes.string,
  /** Button variant enum: 'flat', 'raised', 'fab' */
  variant: PropTypes.string,
};

const defaultProps = {
  color: '',
  label: 'Search',
  hasIcon: true,
  size: 'small',
  toolTip: 'Search',
  toolTipId: 'tooltip-search',
  toolTipPlacement: 'top',
  variant: '',
};

const ButtonSearch = props => (
  <ButtonBase {...props} >
    <MagnifyIcon />
  </ButtonBase>
);

ButtonSearch.propTypes = propTypes;
ButtonSearch.defaultProps = defaultProps;

export default ButtonSearch;
