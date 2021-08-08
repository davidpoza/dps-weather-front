import { useContext, useEffect, useCallback } from 'react';
import get from 'lodash.get';
import moment from 'moment-timezone/builds/moment-timezone-with-data';
import 'moment/locale/es';
import { fetchCurrentData, fetchLogData } from 'actions/chart-actions';
import { fetch24hComparison } from 'actions/24h-comparison';
import Store from 'reducers/store';

const sensors = ['HOME_INDOOR', 'HOME_OUTDOOR', 'BEDROOM', 'BEDROOM2'];

export default function useMain() {
  const [state, dispatch] = useContext(Store);
  const token = get(state, 'user.token');

  const requestAllSensors = useCallback(() => {
    if (token) {
      fetchCurrentData(dispatch, { token });

      sensors.forEach((id) => {
        fetchLogData(dispatch, {
          sensorId: id,
          date: moment().format('YYYY-MM-DD'),
          token,
        });
        fetch24hComparison(dispatch, { stationId: id, token });
      });
    }
  }, [dispatch, token]);

  useEffect(() => {
    requestAllSensors();
    setInterval(() => {
      requestAllSensors();
    }, 2 * 60 * 1000);
  }, [requestAllSensors]);

  return {
    token,
  };
}
