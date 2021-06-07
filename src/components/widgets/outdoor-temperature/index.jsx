import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock, faThermometerQuarter,
} from '@fortawesome/free-solid-svg-icons';
import Typography from '@material-ui/core/Typography';
import WidgetBase from '../base';
import Store from '../../../reducers/store';
import useStyles from './useStyles';
import TrendIcon from '../../trend-icon';
import {
  calculateDewPoint,
  transformDateToLocaleDay,
  calculateTrend,
  filterArrayObjects,
  calculateTHWIndex,
  fromDateTimeToIsoString,
} from '../../helpers/utils';


export default function OutdoorTempertureWidget() {
  const classes = useStyles();
  const [state, dispatch] = useContext(Store);

  const {
    date, outdoorTemp, indoorTemp, indoorHum, outdoorHum, pressure, wind,
  } = state.currentConditions;

  function calculateColor(value) {
    if (value > 27) return '#ac1058';
    if (value < 15) return '#7bb6c9';
    return '#46c48d';
  }

  const last24hDiffHumOutdoor = Math.trunc(outdoorHum - state?.last24hComparison?.['HOME_OUTDOOR']?.humidity);
  const last24hDiffHumIndoor = Math.trunc(indoorHum - state?.last24hComparison?.['HOME_INDOOR']?.humidity);
  // function ExtendedData(sensorId = 'HOME_OUTDOOR') {
  //   return (
  //     <div>
  //       <div className={classes.trend}>
  //         <div>
  //           Interior
  //         </div>
  //         <TrendIcon
  //           trend={
  //             calculateTrend(
  //               indoorTemp,
  //               filterArrayObjects(
  //                 state.graphs?.HOME_INDOOR?.[fromDateTimeToIsoString(date)],
  //                 'temperature',
  //               ),
  //             )
  //           }
  //         />
  //       </div>
  //       <div className={classes.humidity}>
  //         <div>
  //           Humedad
  //         </div>
  //         <div>
  //           <strong>
  //             { `${indoorTemp} % ${last24hDiffHumIndoor > 0 ? `+${last24hDiffHumIndoor}` : last24hDiffHumIndoor}` }
  //           </strong>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

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
            Exterior
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
              { `${value} % ${diff > 0 ? `+${diff}` : diff}` }
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
                <strong>{ `${thw} °C` }</strong>
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
                <strong>{ `${dewPoint} °C` }</strong>
              </div>
            </div>
          )
        }
      </div>
    );
  }

  const DoubleExtended = () => {
    return (
      <div className={classes.doubleExtended}>
        <ExtendedData sensorId="HOME_INDOOR" />
        <ExtendedData sensorId="HOME_OUTDOOR" />
      </div>
    );
  };

  const last24hDiffTempOutdoor = (outdoorTemp - state?.last24hComparison?.['HOME_OUTDOOR']?.temperature)?.toFixed(2);
  const last24hDiffTempIndoor = (indoorTemp - state?.last24hComparison?.['HOME_INDOOR']?.temperature)?.toFixed(2);
  return (
    <WidgetBase title="Temperatura" extended={<DoubleExtended />}>
      <div>
        <FontAwesomeIcon icon={faThermometerQuarter} className={classes.icon} size="2x" />
      </div>
      <div className={classes.value} style={{ color: calculateColor(outdoorTemp) }}>
        { `${outdoorTemp} °C` }
      </div>
      <div>
        <strong>
          { last24hDiffTempOutdoor > 0 ? `+${last24hDiffTempOutdoor} °C` : `${last24hDiffTempOutdoor} °C` }
        </strong>
      </div>
      <div className={classes.value} style={{ color: calculateColor(indoorTemp) }}>
        { `${indoorTemp} °C` }
      </div>
      <div>
        <strong>
          { last24hDiffTempIndoor > 0 ? `+${last24hDiffTempIndoor} °C` : `${last24hDiffTempIndoor} °C` }
        </strong>
      </div>
      <div>
        <Typography variant="caption">
          <FontAwesomeIcon icon={faClock} />
          { ` Última lectura: ${transformDateToLocaleDay(date)}` }
        </Typography>
      </div>
    </WidgetBase>
  );
}
