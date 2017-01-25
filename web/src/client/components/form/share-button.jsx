import React, { PropTypes } from 'react';
import { IconButton } from 'material-ui';
import FaFacebook from 'react-icons/lib/fa/facebook-official';
import FaTwitter from 'react-icons/lib/fa/twitter';

import style from '../../styles/style';
import '../../assets/araceathlete240x240.png';

const propTypes = {
  eventId: PropTypes.string,
  hashtags: PropTypes.array,
  image: PropTypes.string,
  sites: PropTypes.array,
  title: PropTypes.string,
  urlHash: PropTypes.string,
  urlPath: PropTypes.string,
  urlRoot: PropTypes.string,
};

const ShareButtons = ({ hashtags, title, urlHash, urlPath, urlRoot }) => {
  const url = encodeURIComponent(`${urlRoot}/${urlPath}#${urlHash}`);
  const imagePath = encodeURIComponent(`${urlRoot}/assets/araceathlete240x240.png`);
  const encodedTitle = encodeURIComponent(title);
  const sites = ['facebook', 'twitter'];
  const templates = {
    facebook: {
      url: `https://www.facebook.com/sharer/sharer.php?u=${url}&title=${encodedTitle}&image=${imagePath}`,
      icon: FaFacebook,
      toolTip: 'Share on facebook',
    },
    twitter: {
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${url}&hashtags=${hashtags}`,
      icon: FaTwitter,
      toolTip: 'Tweet this!',
    },
  };

  const socialSet = sites.map((s) => {
    const SocialIcon = templates[s].icon;
    const Icon = () => <SocialIcon size={24} />;  // need to pull in Icon here
    const iconButton = (
      <IconButton
        tooltip={templates[s].tooltip}
        tooltipPosition="top-right"
        className="icon-on"
        touch
        style={style.toggleIconButton}
      >
        <Icon />
      </IconButton>
    );
    return (
      <a key={`social${s}`} href={templates[s].url} target="new">{iconButton}</a>
    );
  });
  return (
    <span>
      {socialSet}
    </span>
  );
};

ShareButtons.propTypes = propTypes;
// ShareButtons.defaultProps = defaultProps;

export default ShareButtons;
