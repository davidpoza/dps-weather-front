import React, { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import WidgetBase from '../base';
import Store from '../../../reducers/store';
import useStyles from './useStyles';
import {
  capitalizeFirstWords, transformDateToLocaleDay,
} from '../../helpers/utils';
import DayForecast from './_children/day';

const locations = {
  'colmenar-viejo': 'Colmenar Viejo',
  penalara: 'Peñalara',
  'hoyos-del-espino': 'Hoyos del Espino',
  somosierra: 'Somosierra',
};

export default function ForecastWidget({ defaultLocation }) {
  const [location, setLocation] = useState(defaultLocation);
  const [forecast, setForecast] = useState([]);
  const classes = useStyles();
  const enppoint = `https://tiempo.davidinformatico.com/forecast/${location}.json`;
  const [state, dispatch] = useContext(Store);
  const {
    date, indoorTemp, outdoorTemp, indoorHum, outdoorHum, pressure, wind,
  } = state.currentConditions;

  async function requestForecast() {
    try {
      const res = await fetch(enppoint);
      const data = await res.json();
      return data;
    } catch (Error) {
      console.log('Error during forecast fetch', Error);
      return ([]);
    }
  }

  useEffect(() => {
    (async () => {
      setForecast(await requestForecast());
    })();
  }, [location]);

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
                  <MenuItem value={loc}>
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
          forecast?.data?.map((f) => (
            <DayForecast
              code={f?.['weather_code']?.value}
              date={f?.['observation_time']?.value}
              maxT={f?.temp?.[1]?.max?.value}
              minT={f?.temp?.[0]?.min?.value}
              precipitation={f?.precipitation?.[0]?.max?.value}
              wind={f?.wind_speed?.[1]?.max?.value}
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
