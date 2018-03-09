import React from 'react';
import PropTypes from 'prop-types';
import {
  Area,
  AreaChart,
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import Static from '../form/static';

const propTypes = {
  brush: PropTypes.bool,
  content: PropTypes.any.isRequired,
  contentLabel: PropTypes.string.isRequired,
  contentLabelLink: PropTypes.string,
  contentType: PropTypes.string.isRequired,
  domain: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  dataKey: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  xAxisDataKey: PropTypes.string.isRequired,
};


// TODO look at react-resize-detector
const styles = {
  lineChart: {
    margin: {
      top: 30,
      right: 30,
      left: 0,
      bottom: 0,
    },
    height: 200,
    width: document.documentElement.clientWidth > 760 ?
      600 :
      document.documentElement.clientWidth - 40,
    xAxis: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    yAxis: {
      padding: {
        top: 5,
        bottom: 5,
      },
    },
  },
};

// const setWeight = measurementPref ? 'weight' : 'saWeight';

const linearGrad = () => (
  <defs>
    <linearGradient id="lGColor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#990000" stopOpacity={0.8} />
      <stop offset="95%" stopColor="#990000" stopOpacity={0} />
    </linearGradient>
  </defs>
);

const Chart = props => (
  <div>
    <Static
      contentLabel={props.contentLabel}
      contentLabelLink={props.contentLabelLink}
      content={props.content}
      contentType={props.contentType}
    />
    <ResponsiveContainer width="100%" height={200} >
      <AreaChart
        id={props.id}
        width={styles.lineChart.width}
        height={styles.lineChart.height}
        data={props.data}
        syncId="pageId"
        margin={styles.lineChart.margin}
      >
        {linearGrad()}
        <XAxis dataKey={props.xAxisDataKey} padding={styles.lineChart.xAxis.padding} />
        <YAxis
          type="number"
          domain={props.domain}
          padding={styles.lineChart.yAxis.padding}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          name={props.name}
          dataKey={props.dataKey}
          stroke="#990000"
          fillOpacity={1}
          fill="url(#lGColor)"
        />
        {props.brush ? (
          <Brush />
        ) : null}
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

Chart.propTypes = propTypes;

export default Chart;
