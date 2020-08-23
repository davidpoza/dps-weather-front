import React, { useState, useContext, useCallback } from 'react';
import { ResponsiveLine } from '@nivo/line';
import PropTypes from 'prop-types';
import useStyles from './useStyles';
import Store from '../../reducers/store';

function Chart(props) {
  const { data1, data2 } = props;
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <ResponsiveLine
        colors={{ scheme: 'set1' }}
        pointSize={10}
        curve="monotoneX"
        useMesh // interaction with mouse
        tooltip={(v) => `${v.point.data.yFormatted} a las ${v.point.data.xFormatted}`} // tooltip for interaction
        margin={{
          top: 20, right: 20, bottom: 60, left: 80,
        }}
        data={[
          {
            id: 'Sensor1',
            data: data1.slice(-15).map((value) => ({
              x: value.created_on,
              y: value.temperature,
            })),
          },
          {
            id: 'Sensor2',
            data: data2.slice(-15).map((value) => ({
              x: value.created_on,
              y: value.temperature,
            })),
          },
        ]}
        xScale={{
          // uses d3-time: https://developer.aliyun.com/mirror/npm/package/d3-time-format
          // format as reveived from API
          type: 'time', format: '%d-%m-%Y %H:%M:%S', precision: 'second',
        }}
        xFormat="time:%H:%M" // used in tootltips
        yScale={{
          type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisLeft={{
          legend: 'temperatura',
          legendOffset: 12,
        }}
        axisBottom={{
          legend: 'hora',
          legendOffset: -12,
          format: '%H:%M',
          tickValues: 'every hour',
        }}
      />
    </div>
  );
}

export default Chart;

Chart.propTypes = {
  data1: PropTypes.array,
  data2: PropTypes.array,

};
