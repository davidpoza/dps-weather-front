import React, { useState, useContext, useCallback } from 'react';
import { ResponsiveLine } from '@nivo/line';
import PropTypes from 'prop-types';
import useStyles from './useStyles';
import Store from '../../reducers/store';

function Chart(props) {
  const {
    data1, data2, sensor1, sensor2,
  } = props;
  const classes = useStyles();

  // removes wrong data which is out of certain range depending of type of data
  const filterData = (data, type = 'temperature') => {
    if (type === 'pressure') {
      return data.filter((value) => (value.pressure > 700 && value.pressure < 1300));
    }
    if (type === 'humidity') {
      return data.filter((value) => (value.humidity > 0 && value.humidity < 100));
    }
    return data.filter((value) => (value.temperature > -10 && value.temperature < 50));
  };

  const formatData = (data, type = 'temperature') => {
    if (type === 'pressure') {
      return data.map((value) => ({
        x: value.created_on.slice(11, -3),
        y: value.pressure,
      }));
    }
    if (type === 'humidity') {
      return data.map((value) => ({
        x: value.created_on.slice(11, -3),
        y: value.humidity,
      }));
    }
    return data.map((value) => ({
      x: value.created_on.slice(11, -3),
      y: value.temperature,
    }));
  };

  return (
    <div className={classes.root}>
      <ResponsiveLine
        colors={{ scheme: 'set1' }}
        pointSize={4}
        curve="monotoneX"
        useMesh // interaction with mouse
        tooltip={(v) => `${v.point.data.yFormatted} a las ${v.point.data.xFormatted}`} // tooltip for interaction
        margin={{
          top: 20, right: 20, bottom: 60, left: 80,
        }}
        data={[
          {
            id: sensor1,
            data: formatData(filterData(data1, 'temperature'), 'temperature'),
          },
          {
            id: sensor2,
            data: formatData(filterData(data2, 'temperature'), 'temperature'),
          },
        ]}
        xScale={{
          // uses d3-time: https://developer.aliyun.com/mirror/npm/package/d3-time-format
          // format as reveived from API
          type: 'time', format: '%H:%M', precision: 'second', useUTC: false,
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
        legends={
          [
            {
              anchor: 'bottom-right',
              direction: 'column',
              itemHeight: 20,
              itemWidth: 120,
              translateX: 0, // px
              translateY: -40, // px
              justify: true,
            },
          ]
        }
      />
    </div>
  );
}

export default Chart;

Chart.propTypes = {
  sensor1: PropTypes.string,
  sensor2: PropTypes.string,
  data1: PropTypes.array,
  data2: PropTypes.array,
};
