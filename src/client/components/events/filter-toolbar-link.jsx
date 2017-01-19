import React, { PropTypes } from 'react';
import { FlatButton } from 'material-ui';
import { ActionBookmark, ActionBookmarkOutline, ActionHighlightOff, SocialPerson, SocialPersonOutline } from 'material-ui/svg-icons';

import style from '../../styles/style';

const propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

const EventTBLink = ({ active, children, onClick }) => {
  if (active) {
    return (
      <FlatButton >
        &#9679;&#032;{children}
      </FlatButton>
    )
  }

  return (
    <FlatButton secondary
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      &#9675;&#032;{children}
    </FlatButton>
  );
};

// const EventTBLink = ({ active, children, onClick, filter }) => {
//   if (active) {
//     switch (filter) {
//       case 'EVENTS_SHOW_ALL': {
//         return (<span />);
//       }
//       case 'EVENTS_SHOW_FAVORITE': {
//         return (
//           <FlatButton style={style.toolbar.button} >
//             <ActionBookmark style={style.favButton} />
//           </FlatButton>
//         );
//       }
//       case 'EVENTS_SHOW_OWNER': {
//         return (
//           <FlatButton style={style.toolbar.button} >
//             <SocialPerson style={style.favButton} />
//           </FlatButton>
//         )
//       }
//     }
//   }
//   switch (filter) {
//     case 'EVENTS_SHOW_ALL': {
//       return (
//         <FlatButton
//           onClick={(e) => {
//             e.preventDefault();
//             onClick();
//           }}
//           style={style.toolbar.button} >
//           <ActionHighlightOff style={style.favButton} />
//         </FlatButton>
//       );
//     }
//     case 'EVENTS_SHOW_FAVORITE': {
//       return (
//         <FlatButton
//           onClick={(e) => {
//             e.preventDefault();
//             onClick();
//           }}
//           style={style.toolbar.button} >
//           <ActionBookmarkOutline style={style.favButton} />
//         </FlatButton>
//       );
//     }
//     case 'EVENTS_SHOW_OWNER': {
//       return (
//         <FlatButton
//           onClick={(e) => {
//             e.preventDefault();
//             onClick();
//           }}
//         style={style.toolbar.button}
//         >
//           <SocialPersonOutline style={style.favButton} />
//         </FlatButton>
//       )
//     }
//   }
// };

EventTBLink.propTypes = propTypes;

export default EventTBLink;
