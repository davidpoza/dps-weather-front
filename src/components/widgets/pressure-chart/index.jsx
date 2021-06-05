import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTemperatureLow, faClock, faWind, faTint, faSignal, faHandHoldingWater, faHome, faMale,
  faAngleDown, faAngleUp, faAngleRight, faSun, faMoon, faThermometerQuarter,
} from '@fortawesome/free-solid-svg-icons';
import Typography from '@material-ui/core/Typography';
import WidgetBase from '../base';
import Store from '../../../reducers/store';
import useStyles from './useStyles';
import TrendIcon from '../../trend-icon';
import { getLocaleDate, calculateTrend, filterArrayObjects, calculateTHWIndex } from '../../helpers/utils';
import Chart from '../../chart';


export default function TemperatureChart() {
  const classes = useStyles();
  const [state, dispatch] = useContext(Store);
  const {
    date, indoorTemp, outdoorTemp, indoorHum, outdoorHum, pressure, wind,
  } = state.currentConditions;

  function calculateColor(value) {
    if (value > 27) return '#ac1058';
    if (value < 15) return '#7bb6c9';
    return '#46c48d';
  }

  return (
    <WidgetBase title="Evolución de presión" moreInfo="Inspeccionar">
      <Chart
        data1={state.graph1_points}
        sensor1={state.graph1_sensor || 'HOME_OUTDOOR'}
        date={state.graph1_date}
        mode="pressure"
        marginTop={5}
        marginRight={20}
        marginBottom={70}
        marginLeft={60}
      />
    </WidgetBase>
  );
}
