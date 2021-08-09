import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock, faThermometerQuarter,
} from '@fortawesome/free-solid-svg-icons';
import Typography from '@material-ui/core/Typography';
import Store from 'reducers/store';
import {
  calculateDewPoint,
  transformDateToLocaleDay,
  calculateTrend,
  filterArrayObjects,
  calculateTHWIndex,
  fromDateTimeToIsoString,
  calculateTempColor,
} from 'components/helpers/utils';
import WidgetBase from '../base';
import useStyles from './useStyles';
import TrendIcon from '../../trend-icon';


export default function TempertureWidget() {
  const classes = useStyles();
  const [state] = useContext(Store);

  const {
    date, outdoorTemp, indoorTemp, indoorHum, outdoorHum, wind,
  } = state.currentConditions;

  function ExtendedData({ sensorId = 'HOME_OUTDOOR' }) {
    const value = {
      HOME_OUTDOOR: outdoorHum,
      HOME_INDOOR: indoorHum,
    }[sensorId];
    const diff = {
      HOME_OUTDOOR: Math.trunc(outdoorHum - state?.last24hComparison?.[sensorId]?.humidity),
      HOME_INDOOR: Math.trunc(indoorHum - state?.last24hComparison?.[sensorId]?.humidity),
    }[sensorId];
    const thw = calculateTHWIndex(outdoorTemp, outdoorHum, wind);
    const dewPoint = calculateDewPoint(outdoorTemp, outdoorHum);

    return (
      <div>
        <div className={classes.trend}>
          <div>
            {sensorId === 'HOME_OUTDOOR' ? 'Exterior' : 'Interior'}
          </div>
          <TrendIcon
            trend={
              calculateTrend(
                value,
                filterArrayObjects(
                  state.graphs?.[sensorId]?.[fromDateTimeToIsoString(date)],
                  'temperature',
                ),
              )
            }
          />
        </div>
        <div className={classes.humidity}>
          <div>
            Humedad
          </div>
          <div>
            <strong>
              {`${value} % ${diff > 0 ? `+${diff}` : diff}`}
            </strong>
          </div>
        </div>
        {
          sensorId === 'HOME_OUTDOOR' && (
            <div className={classes.feels}>
              <div>
                Se siente
              </div>
              <div>
                <strong>{`${thw} °C`}</strong>
              </div>
            </div>
          )
        }
        {
          sensorId === 'HOME_OUTDOOR' && (
            <div className={classes.dew}>
              <div>
                Punto de rocío
              </div>
              <div>
                <strong>{`${dewPoint} °C`}</strong>
              </div>
            </div>
          )
        }
      </div>
    );
  }

  ExtendedData.propTypes = {
    sensorId: PropTypes.string,
  };

  const DoubleExtended = () => (
    <div className={classes.doubleExtended}>
      <ExtendedData sensorId="HOME_INDOOR" />
      <ExtendedData sensorId="HOME_OUTDOOR" />
    </div>
  );

  const last24hDiffTempOutdoor = (outdoorTemp - state?.last24hComparison?.['HOME_OUTDOOR']?.temperature)?.toFixed(2);
  const last24hDiffTempIndoor = (indoorTemp - state?.last24hComparison?.['HOME_INDOOR']?.temperature)?.toFixed(2);

  return (
    <WidgetBase title="Temperatura" extended={<DoubleExtended />}>
      <div>
        <FontAwesomeIcon icon={faThermometerQuarter} className={classes.icon} size="2x" />
      </div>
      <div className={classes.value} style={{ color: calculateTempColor(outdoorTemp) }}>
        {`${outdoorTemp} °C`}
      </div>
      <div>
        <strong>
          {
            !isNaN(last24hDiffTempOutdoor) && (
              last24hDiffTempOutdoor > 0
                ? `+${last24hDiffTempOutdoor} °C`
                : `${last24hDiffTempOutdoor} °C`
            )
          }
          {
            isNaN(last24hDiffTempOutdoor) && 'Sin datos hace 24h'
          }
        </strong>
      </div>
      <div className={classes.value} style={{ color: calculateTempColor(indoorTemp) }}>
        {`${indoorTemp} °C`}
      </div>
      <div>
        <strong>
          {
            !isNaN(last24hDiffTempIndoor) && (
              last24hDiffTempIndoor > 0
                ? `+${last24hDiffTempIndoor} °C`
                : `${last24hDiffTempIndoor} °C`
            )
          }
          {
            isNaN(last24hDiffTempIndoor) && 'Sin datos hace 24h'
          }
        </strong>
      </div>
      <div>
        <Typography variant="caption">
          <FontAwesomeIcon icon={faClock} />
          {` Última lectura: ${transformDateToLocaleDay(date)}`}
        </Typography>
      </div>
    </WidgetBase>
  );
}
