import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import TabPanel from '@material-ui/lab/TabPanel';
import Typography from '@material-ui/core/Typography';
import { transformDateToLocaleDay } from 'components/helpers/utils';
import Index from '../index/index';
import useStyles from '../../useStyles';

export default function AirTab({
  value,
  pollenTree,
  pollenGrass,
  pollenWeed,
  madridPollutionScene,
  ts = 0,
}) {
  const classes = useStyles();

  return (
    <TabPanel value={value}>
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
      <div className={classes.pollen}>
        Protocolo anticontaminación C.Madrid
        <Index key="madridPollution" value={madridPollutionScene} max={5} />
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

AirTab.propTypes = {
  value: PropTypes.string,
  pollenTree: PropTypes.number,
  pollenGrass: PropTypes.number,
  pollenWeed: PropTypes.number,
  madridPollutionScene: PropTypes.number,
  ts: PropTypes.number,
};
