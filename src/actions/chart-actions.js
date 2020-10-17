import moment from 'moment';
import { v4 as uuid } from 'uuid';
import get from 'lodash.get';
import api from '../api';
import createChart from '../models/chart';
import current from '../models/current';
import createCurrent from '../models/current';

/* eslint-disable import/prefer-default-export */

export function setGraphSensor(dispatch, { graph, sensorId }) {
  dispatch({
    type: 'SET_GRAPH_SENSOR',
    payload: { graph, sensor: sensorId },
  });
}

export function setGraphDate(dispatch, { graph, date }) {
  dispatch({
    type: 'SET_GRAPH_DATE',
    payload: { graph, date },
  });
}

export function fetchLogData(dispatch, {
  graph, stationId, date, token,
}) {
  const chart = createChart({
    id: uuid(),
    date,
    stationId,
  });
  dispatch({
    type: 'GET_CHART_ATTEMPT',
    payload: { graph },
  });
  api.chart.getData(date, stationId, token)
    .then((res) => {
      if (res.status !== 200) {
        return Promise.reject(new Error('Request error'));
      }
      return res.json();
    })
    .then((data) => {
      if (data.length > 0) {
        return dispatch({
          type: 'GET_CHART_SUCCESS',
          payload: { graph, points: data },
        });
      }
      return Promise.reject(new Error('No data on this date'));
    })
    .catch((err) => {
      dispatch({
        type: 'GET_CHART_FAIL',
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
