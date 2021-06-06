/* eslint-disable import/prefer-default-export */

import api from '../api/index';

export function fetchForecast(dispatch, {
  location,
}) {
  dispatch({
    type: 'GET_FORECAST_ATTEMPT',
    payload: { location },
  });
  api.weather.forecastClimaCell(location)
    .then((res) => res.json())
    .then((data) => {
      return dispatch({
        type: 'GET_FORECAST_SUCCESS',
        payload: { location, forecast: data },
      });
    })
    .catch((err) => {
      dispatch({
        type: 'GET_FORECAST_FAIL',
        payload: { msg: `Error fetching: ${err.message}` },
      });
    });
}

/* eslint-enable import/prefer-default-export */
