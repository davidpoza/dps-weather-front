import React from 'react';
import PropTypes from 'prop-types';
import TabPanel from '@material-ui/lab/TabPanel';
import useStyles from './useStyles';

export default function TextForecastTab({ value, textForecast, ts = 0 }) {
  const classes = useStyles();

  return (
    <TabPanel value={value} className={classes.tabPanel}>
      <div
        className={classes.root}
        dangerouslySetInnerHTML={{ __html: textForecast?.replace(/\r\r\n/g, '<br />') }}
      />
    </TabPanel>
  );
}

TextForecastTab.propTypes = {
  value: PropTypes.string,
  textForecast: PropTypes.string,
  ts: PropTypes.number,
};
