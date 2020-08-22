import moment from 'moment';
import { v4 as uuid } from 'uuid';
import get from 'lodash.get';
import api from '../api';
import createSearch from '../models/search';
import createComment from '../models/comment';

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
/* eslint-enable import/prefer-default-export */
