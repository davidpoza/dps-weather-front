import React, { useState, useContext, useCallback } from 'react';
import { ResponsiveLine } from '@nivo/line';
import PropTypes from 'prop-types';
import useStyles from './useStyles';
import Store from '../../reducers/store';

function Chart(props) {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <ResponsiveLine
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        margin={{
          top: 20, right: 20, bottom: 60, left: 80,
        }}
        data={[
          {
            id: 'fake corp. A',
            data: [
              { x: 0, y: 7 },
              { x: 1, y: 5 },
              { x: 2, y: 11 },
              { x: 3, y: 9 },
              { x: 4, y: 13 },
              { x: 7, y: 16 },
              { x: 9, y: 12 },
            ],
          },
        ]}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisLeft={{
          legend: 'linear scale',
          legendOffset: 12,
        }}
        axisBottom={{
          legend: 'linear scale',
          legendOffset: -12,
        }}
      />
    </div>
  );
}

export default Chart;

Chart.propTypes = {

};
