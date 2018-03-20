import React from 'react';
import PropTypes from 'prop-types';
import DownloadIcon from 'mdi-react/DownloadIcon';

import ButtonBase from '../base';

/**

import ButtonDownload from '../button/downlaod';

* Required only props

<ButtonDownload
  onClick={handleClose}
/>

*
* All Props

<ButtonDownload
  onClick={handleClose}
  color="primary"
  label="Download"
  size="small"
  toolTip="Download Activities"
  toolTipId="tooltip-downlaod"
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
  color: 'primary',
  label: 'Download',
  hasIcon: true,
  onClick: () => null,
  size: 'small',
  toolTip: 'Downlaod',
  toolTipId: 'tooltip-download',
  toolTipPlacement: 'top',
  variant: 'flat',
};

const ButtonDownload = props => (
  <ButtonBase {...props} >
    <DownloadIcon />
  </ButtonBase>
);

ButtonDownload.propTypes = propTypes;
ButtonDownload.defaultProps = defaultProps;

export default ButtonDownload;
