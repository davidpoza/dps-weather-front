import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import Typography from '@material-ui/core/Typography';
import WidgetBase from '../base';
import Store from '../../../reducers/store';
import useStyles from './useStyles';
import { transformDateToLocaleDay, getCESTTime } from '../../helpers/utils';
import Index from './_children/index/index';
import api from '../../../api/index';

export default function RealtimeWidget({ location }) {
  const [state, dispatch] = useContext(Store);
  const [realtimeData, setRealtimeData] = useState();
  const { wind } = state.currentConditions;
  const classes = useStyles();

  async function makeRequest() {
    const res = await api.weather.getForecast(location);
    setRealtimeData(await res.json());
  }

  useEffect(() => {
    (async () => {
      await makeRequest();
    })();
    setInterval(async () => {
      await makeRequest();
    }, 2 * 60 * 1000);
  }, []);
console.log(">>>",realtimeData)
  const visibility = realtimeData?.data?.current?.visibility;
  const uvi = realtimeData?.data?.current?.uvi;
  const cloudCover = realtimeData?.data?.current?.['cloud_cover'];
  const windDirection = realtimeData?.data?.current?.['wind_direction'] || 0;
  const sunrise = realtimeData?.data?.current?.sunrise * 1000;
  const sunset = realtimeData?.data?.current?.sunset * 1000;
  const pollenWeed = realtimeData?.data?.pollen?.weedIndex;
  const pollenTree = realtimeData?.data?.pollen?.treeIndex;
  const pollenGrass = realtimeData?.data?.pollen?.grassIndex;

  const Extended = () => (
    <div>
      <div className={classes.visibility}>
        Visibilidad:
        <br />
        <strong>
          {` ${(visibility / 1000)?.toFixed(2)}Km.`}
        </strong>
      </div>
      <div className={classes.cloudCover}>
        Cobertura de nubes:
        <br />
        <strong>
          {` ${cloudCover?.toFixed(2)}%.`}
        </strong>
      </div>
      <div className={classes.radiation}>
        Radiación ultravioleta:
        <br />
        <strong>
          {` ${uvi?.toFixed(2)}`}
        </strong>
      </div>
      <div className={classes.radiation}>
        <FontAwesomeIcon icon={faSun} />
        {`${sunrise ? getCESTTime(sunrise) : ''} `}
        <FontAwesomeIcon icon={faMoon} />
        {`${sunset ? getCESTTime(sunset) : ''}`}
      </div>
      <div className={classes.pollen}>
        Polen maleza
        <Index key="pollenWeed" value={pollenWeed} max={5} />
      </div>
      <div className={classes.pollen}>
        Polen hierba
        <Index key="pollenGrass" value={pollenGrass} max={5} />
      </div>
      <div className={classes.pollen}>
        Polen árboles
        <Index key="pollenTree" value={pollenTree} max={5} />
      </div>
    </div>
  );

  return (
    <WidgetBase title="Condiciones en tiempo real" extended={<Extended />}>
      <div className={classes.wind}>
        <img
          className={classes.icon}
          src="svg/wind-rose.svg"
          style={{ transform: `rotate(${windDirection}deg)` }}
          alt={windDirection}
        />
        <div>
          <div>
            {wind}
          </div>
          <div className="units">
            Km/h
          </div>
        </div>
      </div>
      <div className={classes.updated}>
        <Typography variant="caption">
          {
            realtimeData?.ts && (
              <>
                <FontAwesomeIcon icon={faClock} />
                {` ${transformDateToLocaleDay(realtimeData.ts)}`}
              </>
            )
          }
        </Typography>
      </div>
    </WidgetBase>
  );
}
