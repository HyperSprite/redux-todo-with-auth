import React from 'react';
import { addDays } from 'date-fns';

import OneDayWeather from './../weather/one-day-weather';

function renderMultiDayWeather(props) {
  const daySet = [props.date];
  for (let i = 1; i < props.eventDays; i++) {
    daySet.push(addDays(props.date, i));
  }
  return (
    <div>
      {daySet.map(d => (
        <div key={d} >
          <OneDayWeather
            geoCoordinates={props.geoCoordinates}
            dstOffset={props.dstOffset}
            tzOffset={props.tzOffset}
            date={+new Date(d)}
            measurementPref={props.measurementPref}
            expanded={props.expanded}
            noShowExtender
          />
        </div>
      ))}
    </div>
  );
};

export default renderMultiDayWeather;
