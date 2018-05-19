import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Tooltip from '@material-ui/core/Tooltip';
import FacebookBoxIcon from 'mdi-react/FacebookBoxIcon';
import TwitterBoxIcon from 'mdi-react/TwitterBoxIcon';
import LinkVariantIcon from 'mdi-react/LinkVariantIcon';
import CalendarPlusIcon from 'mdi-react/CalendarPlusIcon';

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

const styles = theme => ({
  root: {},
});

const ShareButtons = ({ classes, hashtags, title, urlHash, urlPath, urlRoot, ...event }) => {
  const url = encodeURIComponent(`${urlRoot}/${urlPath}#${urlHash}`);
  const imagePath = encodeURIComponent(`${urlRoot}/assets/araceathlete240x240.png`);
  const encodedTitle = encodeURIComponent(title);
  const encodedLocation = encodeURIComponent(`${event.eventLocStreet}, ${event.eventLocCity}, ${event.eventLocState} ${event.eventLocZip}, ${event.eventLocCountry}`);
  const eventDate = event.eventDate.replace(/-|:|T.*|\.\d\d\d/g, '');
  const eventDateEnd = event.eventDateEnd.replace(/-|:|T.*|\.\d\d\d/g, '');

  const googleCalURL = `http://www.google.com/calendar/event?action=TEMPLATE&text=${event.eventTitle}+-+${event.eventAthleteType}&dates=${eventDate}/${(eventDateEnd * 1) + 1}&details=araceathlete.com+link%0A${url}&location=${encodedLocation}&trp=false`;

  const sites = ['link', 'googleCal', 'facebook', 'twitter'];
  const templates = {
    link: {
      url: `/${urlPath}#${urlHash}`,
      icon: LinkVariantIcon,
      toolTip: 'Link to this Event',
      target: '_self',
      rel: 'bookmark',
    },
    googleCal: {
      url: googleCalURL,
      icon: CalendarPlusIcon,
      toolTip: 'Add to Google Calendar',
      target: 'new',
      rel: 'nofollow',
    },
    facebook: {
      url: `https://www.facebook.com/sharer/sharer.php?u=${url}&title=${encodedTitle}&image=${imagePath}`,
      icon: FacebookBoxIcon,
      toolTip: 'Share on facebook',
      target: 'new',
      rel: 'nofollow',
    },
    twitter: {
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${url}&hashtags=${hashtags}`,
      icon: TwitterBoxIcon,
      toolTip: 'Tweet this!',
      target: 'new',
      rel: 'nofollow',
    },
  };

  const socialSet = sites.map((s) => {
    const SocialIcon = templates[s].icon;
    const Icon = () => <SvgIcon><SocialIcon size={24} color="inherit" /></SvgIcon>;  // need to pull in Icon here
    const iconButton = (
      <Tooltip
        id={`social${s.icon}`}
        title={templates[s].toolTip}
        placement="bottom"
      >
        <IconButton
          className={classes.icon}
          color="primary"
        >
          <Icon />
        </IconButton>
      </Tooltip>
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
export default withStyles(styles, { name: 'StyledShareButtons' })(ShareButtons);
