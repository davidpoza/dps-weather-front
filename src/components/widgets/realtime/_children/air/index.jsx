import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import TabPanel from '@material-ui/lab/TabPanel';
import Typography from '@material-ui/core/Typography';
import useStyles from '../../useStyles';
import { transformDateToLocaleDay, getCESTTime } from '../../../../helpers/utils';

export default function AirTab({ value, windSpeed, windDirection, ts = 0 }) {
  const classes = useStyles();

  return (
    <TabPanel value={value}>
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
    </TabPanel>
  );
}
