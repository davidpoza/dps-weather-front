import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

function getColor(val) {
  if (val <= 20) return '#46c48d';
  if (val > 20 && val <= 40) return '#008aa4';
  if (val > 40 && val <= 60) return '#1990ff';
  if (val > 60 && val <= 80) return '#942887';
  return '#bb1e58';
}

export default function Index({ value, max }) {
  /**
   * @param {number} val - number in 0 - 100 range
   * @returns
   */

  const BorderLinearProgress = withStyles(() => ({
    root: {
      height: 5,
      borderRadius: 3,
    },
    colorPrimary: {
      backgroundColor: '#fbf5e8',
      border: '1px solid #c0c0c0',
    },
    bar: {
      backgroundColor: getColor((value / max) * 100),
    },
  }))(LinearProgress);

  return (
    <BorderLinearProgress variant="determinate" value={(value / max) * 100} />
  );
}
