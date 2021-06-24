import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import TabPanel from '@material-ui/lab/TabPanel';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { getMoonPhaseImage, getCESTTime } from '../../../../helpers/utils';

export default function AstroTab({
  value, moonPhase, sunrise, sunset, moonrise, moonset, ts = 0,
}) {
  const classes = useStyles();
  const moon = getMoonPhaseImage(moonPhase);

  return (
    <TabPanel value={value}>
      <div className={classes.root}>
        <div className={classes.col}>
          <div>
            <img className={classes.sunImage} src="svg/sunset.svg" alt="sunset" />
          </div>
          <div>
            <FontAwesomeIcon icon={faSun} />
            {`${sunrise ? ` ${getCESTTime(sunrise)}` : ''} `}
            <br />
            <FontAwesomeIcon icon={faMoon} />
            {`${sunset ? ` ${getCESTTime(sunset)}` : ''}`}
          </div>
        </div>
        <div className={classes.col}>
          <div>
            { moonPhase && <img className={classes.moonImage} src={moon.image} alt="lunar_phase" /> }
          </div>
          <div>
            {moon.phase}
            <br />
            <FontAwesomeIcon icon={faClock} />
            {`${moonrise ? getCESTTime(moonrise) : ''} `}
            <FontAwesomeIcon icon={faClock} />
            {`${moonset ? getCESTTime(moonset) : ''}`}
          </div>
        </div>
      </div>
    </TabPanel>
  );
}
