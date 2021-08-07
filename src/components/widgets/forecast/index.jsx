import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import useCachedFetch from 'hooks/useCachedFetch';
import {
  transformDateToLocaleDay, formatWeekDay,
} from 'components/helpers/utils';
import WidgetBase from '../base';
import useStyles from './useStyles';
import DayForecast from './_children/day';

const locations = {
  'colmenar-viejo': 'Colmenar Viejo',
  penalara: 'Peñalara',
  'hoyos-del-espino': 'Hoyos del Espino',
  somosierra: 'Somosierra',
};

export default function ForecastWidget({ defaultLocation }) {
  const [location, setLocation] = useState(defaultLocation);
  const classes = useStyles();
  const enppoint = `https://tiempo.davidinformatico.com/forecastv2/${location}.json`;

  const [forecast] = useCachedFetch(enppoint);

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
              onChange={(e) => {
                setLocation(e.target.value);
              }}
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
        {
          forecast?.data?.['daily_forecast']?.slice(1, 6).map((f, i) => (
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
            forecast.ts && (
              <>
                <FontAwesomeIcon icon={faClock} />
                { ` Actualizado en: ${transformDateToLocaleDay(forecast.ts)}` }
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
