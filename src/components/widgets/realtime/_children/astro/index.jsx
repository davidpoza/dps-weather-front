import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun, faMoon, faArrowUp, faArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import TabPanel from '@material-ui/lab/TabPanel';
import { getMoonPhaseImage, getCESTTime } from 'components/helpers/utils';
import useStyles from './useStyles';

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
            <img className={classes.sunImage} src="sun.png" alt="sunset" />
          </div>
          <div className={classes.clock}>
            <div className="text">Salida y puesta de sol</div>
            <FontAwesomeIcon icon={faSun} />
            <FontAwesomeIcon style={{ fontSize: '10px' }} icon={faArrowUp} />
            {`${sunrise ? ` ${getCESTTime(sunrise)}` : ''} `}
            <br />
            <FontAwesomeIcon icon={faSun} />
            <FontAwesomeIcon style={{ fontSize: '10px' }} icon={faArrowDown} />
            {`${sunset ? ` ${getCESTTime(sunset)}` : ''}`}
          </div>
        </div>
        <div className={classes.col}>
          <div>
            { moonPhase && <img className={classes.moonImage} src={moon.image} alt="lunar_phase" /> }
          </div>
          <div className={classes.clock}>
            <div className="text">{moon.phase}</div>
            <FontAwesomeIcon icon={faMoon} />
            <FontAwesomeIcon style={{ fontSize: '10px' }} icon={faArrowUp} />
            {`${moonrise ? ` ${getCESTTime(moonrise)}` : ''} `}
            <br />
            <FontAwesomeIcon icon={faMoon} />
            <FontAwesomeIcon style={{ fontSize: '10px' }} icon={faArrowDown} />
            {`${moonset ? ` ${getCESTTime(moonset)}` : ''}`}
          </div>
        </div>
      </div>
    </TabPanel>
  );
}
