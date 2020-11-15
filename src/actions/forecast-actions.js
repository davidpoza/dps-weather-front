/* eslint-disable import/prefer-default-export */

export function fetchForecast(dispatch, {
  location,
}) {
  dispatch({
    type: 'GET_FORECAST_ATTEMPT',
    payload: { location },
  });
  fetch(`https://tiempo.davidinformatico.com/forecast/${location}.json`)
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
