import React, { useState, useContext, useCallback } from 'react';
import { ResponsiveLine } from '@nivo/line';
import PropTypes from 'prop-types';
import useStyles from './useStyles';
import { transformDateToLocaleLongFormat } from '../helpers/utils';

function Chart({
  charts = [],
  date,
  mode = 'temperature',
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
}) {
  const classes = useStyles();

  // removes wrong data which is out of certain range depending of type of data
  const filterData = (data, type = 'temperature') => {
    if (type === 'pressure') {
      return data.filter((value) => (value.pressure > 700 && value.pressure < 1300));
    }
    if (type === 'humidity') {
      return data.filter((value) => (value.humidity > 0 && value.humidity < 100));
    }
    if (type === 'wind') {
      return data.filter((value) => (value.wind >= 0 && value.wind < 50));
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
    if (type === 'wind') {
      return data.map((value) => ({
        x: value.created_on.slice(11, -3),
        y: value.wind,
      }));
    }
    return data.map((value) => ({
      x: value.created_on.slice(11, -3),
      y: value.temperature,
    }));
  };

  /**
   * get units given a measurement mode
   */
  const getUnits = (type = 'temperature') => {
    if (type === 'pressure') {
      return ' mbar';
    }
    if (type === 'wind') {
      return ' Km/h';
    }
    if (type === 'humidity') {
      return '%';
    }
    return '°';
  };

  const data = charts.map((c) => ({
    id: `${c.sensorId ? `${c.sensorId}, ` : ''}en ${transformDateToLocaleLongFormat(date)}`,
    data: formatData(filterData(c.data, mode), mode),
  }));

  return (
    <div className={classes.root}>

      <ResponsiveLine
        colors={{ scheme: 'set1' }}
        pointSize={4}
        curve="monotoneX"
        useMesh // interaction with mouse
        animate={false}
        tooltip={(v) => `${v.point.data.yFormatted}${getUnits(mode)} a las ${v.point.data.xFormatted}`} // tooltip for interaction
        margin={{
          top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft,
        }}
        data={data}
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
          legendOffset: 13,
        }}
        axisBottom={{
          legendOffset: 40,
          legendPosition: 'middle',
          format: '%H',
          tickValues: 'every hour',
        }}
        legends={
          [
            {
              anchor: 'bottom-right',
              direction: 'column',
              itemHeight: 20,
              itemWidth: 275,
              translateX: -20, // px
              translateY: 20 * (charts.length - 1) + 50, // px
              justify: false,
            },
          ]
        }
      />
    </div>
  );
}

export default Chart;

Chart.propTypes = {
  charts: PropTypes.arrayOf(PropTypes.shape({
    sensorId: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
      created_on: PropTypes.string,
      pressure: PropTypes.number,
      temperature: PropTypes.number,
      wind: PropTypes.number,
      humidity: PropTypes.number,
    })),
  })),
  date: PropTypes.string,
  mode: PropTypes.string,
  marginTop: PropTypes.number,
  marginRight: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
};
