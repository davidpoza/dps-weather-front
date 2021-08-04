import React from 'react';
import PropTypes from 'prop-types';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import useStyles from './useStyles';

export default function TrendIcon({ trend }) {
  const classes = useStyles();
  if (trend > 0) {
    return <TrendingUpIcon className={classes.root} />;
  }
  if (trend < 0) {
    return <TrendingDownIcon className={classes.root} />;
  }
  return <TrendingFlatIcon className={classes.root} />;
}

TrendIcon.propTypes = {
  trend: PropTypes.number,
};
