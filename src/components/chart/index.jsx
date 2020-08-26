import React, { useState, useContext, useCallback } from 'react';
import { ResponsiveLine } from '@nivo/line';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import useStyles from './useStyles';
import Store from '../../reducers/store';

function Chart(props) {
  const {
    data1, data2, date1, date2, sensor1, sensor2,
  } = props;
  const [mode, setMode] = useState('temperature');
  const classes = useStyles();

  const handleModeChange = (event) => {
    setMode(event.target.value);
  };

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
      <FormControl className={classes.modeSelector}>
        <InputLabel id="mode-label">Modo</InputLabel>
        <Select
          labelId="mode-label"
          id="mode-select"
          value={mode}
          onChange={handleModeChange}
        >
          <MenuItem value="temperature">Temperature</MenuItem>
          <MenuItem value="pressure">Barómetro</MenuItem>
          <MenuItem value="humidity">Humedad</MenuItem>
        </Select>
      </FormControl>
      <ResponsiveLine
        colors={{ scheme: 'set1' }}
        pointSize={4}
        curve="monotoneX"
        useMesh // interaction with mouse
        animate={false}
        tooltip={(v) => `${v.point.data.yFormatted} a las ${v.point.data.xFormatted}`} // tooltip for interaction
        margin={{
          top: 20, right: 20, bottom: 130, left: 40,
        }}
        data={[
          {
            id: `#1 ${date1} ${sensor1}`,
            data: formatData(filterData(data1, 'temperature'), 'temperature'),
          },
          {
            id: `#2 ${date2} ${sensor2}`,
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
          legendOffset: 12,
        }}
        axisBottom={{
          legend: 'hora',
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
              itemWidth: 175,
              translateX: 0, // px
              translateY: 70, // px
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
  date1: PropTypes.string,
  date2: PropTypes.string,
};
