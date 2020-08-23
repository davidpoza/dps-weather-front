import moment from 'moment';
import { v4 as uuid } from 'uuid';
import get from 'lodash.get';
import api from '../api';
import createChart from '../models/chart';

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
    .then((res) => (res.json()))
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

/* eslint-enable import/prefer-default-export */
