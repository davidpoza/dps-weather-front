import React from 'react';
import Grid from '@material-ui/core/Grid';
import TempertureWidget from 'components/widgets/temperature';
import WebcamWidget from 'components/widgets/webcam';
import TemperatureChartWidget from 'components/widgets/temperature-chart';
import PressureChartWidget from 'components/widgets/pressure-chart';
import ForecastWidget from 'components/widgets/forecast';
import WindChartWidget from 'components/widgets/wind-chart';
import HumidityChartWidget from 'components/widgets/humidity-chart';
import RealtimeWidget from 'components/widgets/realtime';
import WindyWidget from 'components/widgets/windy';
import useStyles from './useStyles';
import useMain from './hook';

function MainScreen() {
  const classes = useStyles();
  const { token } = useMain();

  if (!token) return null;
  return (
    <>
      <Grid
        className={classes.root}
        container
        spacing={2}
        alignItems="center"
        justify="center"
      >
        <TempertureWidget />
        <WebcamWidget />
        <RealtimeWidget location="colmenar-viejo" />
        <TemperatureChartWidget />
        <ForecastWidget defaultLocation="colmenar-viejo" />
        <PressureChartWidget />
        <WindChartWidget />
        <HumidityChartWidget />
        <WindyWidget />
      </Grid>

    </>
  );
}

export default MainScreen;
