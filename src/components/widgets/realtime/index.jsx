import React from 'react';
import PropTypes from 'prop-types';
import TabContext from '@material-ui/lab/TabContext';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import WidgetBase from '../base';
import useStyles from './useStyles';
import AirTab from './_children/air/index';
import CloudsTab from './_children/clouds/index';
import AstroTab from './_children/astro/index';
import HoursTab from './_children/hours/index';
import TextForecastTab from './_children/textForecast/index';
import useRealtime from './hook';

export default function RealtimeWidget({ location }) {
  const classes = useStyles();
  const {
    cloudCover,
    handleTabChange,
    hourly,
    madridPollutionScene,
    moonPhase,
    moonrise,
    moonset,
    pollenGrass,
    pollenTree,
    pollenWeed,
    sunrise,
    sunset,
    tab,
    textForecast,
    ts,
    uvi,
    visibility,
    windDirection,
    windSpeed,
  } = useRealtime(location);

  return (
    <WidgetBase spaceBetween>
      <TabContext value={tab}>
        <Tabs
          value={tab}
          variant="fullWidth"
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab classes={{ root: classes.tab }} label="Astro" value="1" />
          <Tab classes={{ root: classes.tab }} label="Aire" value="2" />
          <Tab classes={{ root: classes.tab }} label="Avance" value="3" />
          <Tab classes={{ root: classes.tab }} label="Nubes" value="4" />
          <Tab classes={{ root: classes.tab }} label="P.Texto" value="5" />
        </Tabs>
        <AstroTab
          value="1"
          moonPhase={moonPhase}
          sunrise={sunrise}
          sunset={sunset}
          moonrise={moonrise}
          moonset={moonset}
        />
        <AirTab
          value="2"
          pollenWeed={pollenWeed}
          pollenTree={pollenTree}
          pollenGrass={pollenGrass}
          madridPollutionScene={madridPollutionScene?.scene}
          ts={madridPollutionScene?.ts}
        />
        <HoursTab value="3" data={hourly} />
        <CloudsTab
          value="4"
          windDirection={windDirection}
          windSpeed={windSpeed}
          ts={ts}
          cloudCover={cloudCover}
          visibility={visibility}
          uvi={uvi}
          textForecast={textForecast}
        />
        <TextForecastTab value="5" textForecast={textForecast} />
      </TabContext>
    </WidgetBase>
  );
}

RealtimeWidget.propTypes = {
  location: PropTypes.string,
};
