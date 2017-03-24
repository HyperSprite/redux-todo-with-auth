import React, { PropTypes } from 'react';
import { IconButton } from 'material-ui';
import FaFacebook from 'react-icons/lib/fa/facebook-official';
import FaTwitter from 'react-icons/lib/fa/twitter';
import FaChain from 'react-icons/lib/fa/chain';
import FaCalendar from 'react-icons/lib/fa/calendar-plus-o';

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

const ShareButtons = ({ ...event, hashtags, title, urlHash, urlPath, urlRoot }) => {
  const url = encodeURIComponent(`${urlRoot}/${urlPath}#${urlHash}`);
  const imagePath = encodeURIComponent(`${urlRoot}/assets/araceathlete240x240.png`);
  const encodedTitle = encodeURIComponent(title);
  const encodedLocation = encodeURIComponent(`${event.eventLocStreet}, ${event.eventLocCity}, ${event.eventLocState} ${event.eventLocZip}, ${event.eventLocCountry}`);
  const eventDate = event.eventDate.replace(/-|:|T.*|\.\d\d\d/g, '');

  const googleCalURL = `http://www.google.com/calendar/event?action=TEMPLATE&text=${event.eventTitle}+-+${event.eventAthleteType}&dates=${eventDate}/${(eventDate * 1) + 1}&details=A+Race+athlete+link%0A${url}%0A${event.eventDesc}&location=${encodedLocation}&trp=false`;

  const sites = ['link', 'googleCal', 'facebook', 'twitter'];
  const templates = {
    link: {
      url: `/${urlPath}#${urlHash}`,
      icon: FaChain,
      toolTip: 'Link to this Event',
      target: '_self',
      rel: 'bookmark',
    },
    googleCal: {
      url: googleCalURL,
      icon: FaCalendar,
      toolTip: 'Add to Google Calendar',
      target: 'new',
      rel: 'nofollow',
    },
    facebook: {
      url: `https://www.facebook.com/sharer/sharer.php?u=${url}&title=${encodedTitle}&image=${imagePath}`,
      icon: FaFacebook,
      toolTip: 'Share on facebook',
      target: 'new',
      rel: 'nofollow',
    },
    twitter: {
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${url}&hashtags=${hashtags}`,
      icon: FaTwitter,
      toolTip: 'Tweet this!',
      target: 'new',
      rel: 'nofollow',
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
      <a key={`social${s}`} href={templates[s].url} target={templates[s].target} rel={templates[s].rel} >{iconButton}</a>
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
