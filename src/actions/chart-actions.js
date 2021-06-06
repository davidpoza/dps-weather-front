import api from '../api';
import createCurrent from '../models/current';

/* eslint-disable import/prefer-default-export */

export function fetchLogData(dispatch, {
  sensorId, date, token,
}) {
  dispatch({
    type: 'GET_GRAPH_ATTEMPT',
    payload: { sensorId },
  });
  api.chart.getData(date, sensorId, token)
    .then((res) => {
      if (res.status !== 200) {
        return Promise.reject(new Error('Request error'));
      }
      return res.json();
    })
    .then((data) => {
      if (data.length > 0) {
        return dispatch({
          type: 'GET_GRAPH_SUCCESS',
          payload: { sensorId, date, data },
        });
      }
      return Promise.reject(new Error('No data on this date'));
    })
    .catch((err) => {
      dispatch({
        type: 'GET_GRAPH_FAIL',
        payload: { msg: `Error fetching: ${err.message}` },
      });
    });
}

export function fetchCurrentData(dispatch, { token }) {
  const currentData = createCurrent({});
  api.chart.getCurrentData('HOME_INDOOR', token)
    .then((res) => (res.json()))
    .then((data) => {
      if (data) {
        currentData.indoorTemp = data.temperature;
        currentData.indoorHum = data.humidity;
        return Promise.resolve();
      }
      return Promise.reject(new Error('No data for indoor unit'));
    })
    .then(() => api.chart.getCurrentData('HOME_OUTDOOR', token))
    .then((res) => (res.json()))
    .then((data) => {
      if (data) {
        dispatch({
          type: 'GET_CURRENT_ATTEMPT',
        });
        return dispatch({
          type: 'GET_CURRENT_SUCCESS',
          payload: {
            outdoorTemp: data.temperature,
            outdoorHum: data.humidity,
            indoorTemp: currentData.indoorTemp,
            indoorHum: currentData.indoorHum,
            pressure: data.pressure,
            wind: data.wind,
            date: data.created_on,
          },
        });
      }
      return Promise.reject(new Error('No data for outdoot unit'));
    })
    .catch((err) => {
      dispatch({
        type: 'GET_CURRENT_FAIL',
        payload: { msg: `Error fetching: ${err.message}` },
      });
    });
}

/* eslint-enable import/prefer-default-export */
