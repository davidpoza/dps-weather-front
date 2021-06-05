import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTemperatureLow, faClock, faWind, faTint, faSignal, faHandHoldingWater, faHome, faMale,
  faAngleDown, faAngleUp, faAngleRight, faSun, faMoon,
} from '@fortawesome/free-solid-svg-icons';
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
