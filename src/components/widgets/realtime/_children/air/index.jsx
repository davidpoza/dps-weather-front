import React from 'react';
import TabPanel from '@material-ui/lab/TabPanel';
import Index from '../index/index';
import useStyles from '../../useStyles';
import { transformDateToLocaleDay, getCESTTime } from '../../../../helpers/utils';

export default function AirTab({ value, pollenTree, pollenGrass, pollenWeed, ts = 0 }) {
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
    </TabPanel>
  );
}
