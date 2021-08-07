import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import TabPanel from '@material-ui/lab/TabPanel';
import Typography from '@material-ui/core/Typography';
import { transformDateToLocaleDay, getUVI } from 'components/helpers/utils';
import useStyles from './useStyles';

export default function AirTab({ value, windSpeed, windDirection, visibility, cloudCover, uvi, ts = 0 }) {
  const classes = useStyles();

  const Extended = () => (
    <div className={classes.extendedInfo}>
      <div className={classes.visibility}>
        Visibilidad
        <br />
        <strong>
          {` ${(visibility / 1000)?.toFixed(2)}Km`}
        </strong>
      </div>
      <div className={classes.cloudCover}>
        Cobertura de nubes
        <br />
        <strong>
          {` ${cloudCover?.toFixed(2)}%`}
        </strong>
      </div>
      <div className={classes.radiation}>
        Radiación ultravioleta
        <br />
        <strong style={{ color: getUVI(uvi).color }}>
          {` ${uvi?.toFixed(2)} ${getUVI(uvi).description}`}
        </strong>
      </div>
    </div>
  );

  return (
    <TabPanel value={value} className={classes.tabPanel}>
      <div className={classes.root}>
        <div>
          <div className={classes.wind}>
            <img
              className={classes.icon}
              src="svg/wind-rose.svg"
              style={{ transform: `rotate(${windDirection}deg)` }}
              alt={windDirection}
            />
            <div>
              <div>
                {windSpeed}
              </div>
              <div className="units">
                Km/h
              </div>
            </div>
          </div>
          <div className={classes.updated}>
            <Typography variant="caption">
              {
                ts && (
                  <>
                    <FontAwesomeIcon icon={faClock} />
                    {` ${transformDateToLocaleDay(ts)}`}
                  </>
                )
              }
            </Typography>
          </div>
        </div>
        <Extended />
      </div>
    </TabPanel>
  );
}
