/* eslint-disable import/prefer-default-export */

import api from '../api/index';
import { getDateTimeAsString } from '../components/helpers/utils';

export function fetch24hComparison(dispatch, {
  stationId, token,
}) {
  dispatch({
    type: 'GET_24H_COMPARISON_ATTEMPT',
  });
  api.weather.getLast24Comparison(getDateTimeAsString(new Date().getTime() - 24 * 3600 * 1000), stationId, token)
    .then((res) => res.json())
    .then((data) => {
      return dispatch({
        type: 'GET_24H_COMPARISON_SUCCESS',
        payload: { stationId, data },
      });
    })
    .catch((err) => {
      dispatch({
        type: 'GET_24H_COMPARISON_FAIL',
        payload: { msg: `Error fetching: ${err.message}` },
      });
    });
}

/* eslint-enable import/prefer-default-export */
