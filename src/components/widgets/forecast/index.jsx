import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import {
  transformDateToLocaleDay, formatWeekDay,
} from 'components/helpers/utils';
import WidgetBase from '../base';
import useStyles from './useStyles';
import DayForecast from './_children/day';
import useForecast from './hook';

export default function ForecastWidget({ defaultLocation }) {
  const classes = useStyles();
  const {
    current,
    forecast,
    handleLocationChange,
    location,
    locations,
    ts,
  } = useForecast(defaultLocation);

  return (
    <WidgetBase
      title={`Pronóstico 5 días para ${locations[location]}`}
      actionsClasses={classes.buttons}
      actions={(
        <>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              labelId="selected"
              id="selected"
              value={location}
              onChange={handleLocationChange}
              label="Selecciona localización"
            >
              {
                Object.keys(locations).map((loc) => (
                  <MenuItem key={`menuitem${loc}`} value={loc}>
                    {locations[loc]}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </>
      )}
    >
      <div className={classes.root}>
        <DayForecast
          key="currentday"
          code={current?.weather}
          date={formatWeekDay(new Date().getTime() / 1000)}
          currentT={current?.temp}
          precipitation={current?.rain}
          probPrecipitation={current?.['probability_of_precipitation']}
          wind={current?.['wind_speed']}
        />
        {
          forecast?.map((f, i) => (
            <DayForecast
              key={`day${i}`}
              code={f?.weather}
              date={formatWeekDay(f?.date)}
              maxT={f?.['max_temp']}
              minT={f?.['min_temp']}
              precipitation={f?.rain}
              probPrecipitation={f?.['probability_of_precipitation']}
              wind={f?.['wind_speed']}
            />
          ))
        }
      </div>
      <div className={classes.updated}>
        <Typography variant="caption">
          {
            ts && (
              <>
                <FontAwesomeIcon icon={faClock} />
                { ` Actualizado en: ${transformDateToLocaleDay(ts)}` }
              </>
            )
          }
        </Typography>
      </div>
    </WidgetBase>
  );
}

ForecastWidget.propTypes = {
  defaultLocation: PropTypes.string,
};
