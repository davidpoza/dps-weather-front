import React, {
  useState, useContext, useCallback, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone/builds/moment-timezone-with-data';
import get from 'lodash.get';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';
import Store from 'reducers/store';
import { fetchLogData } from 'actions/chart-actions';
import usePrevious from 'hooks/use-previous';
import useStyles from './useStyles';
import DateSelector from '../date-selector';

function SearchFrom(props) {
  const { setFormOpen } = props;
  const [state, dispatch] = useContext(Store);
  const [requestCount, setRequestCount] = useState(0);

  const openLogin = useCallback(() => {
    setFormOpen(true);
  }, [setFormOpen]);

  const classes = useStyles();

  const makeRequests = () => {
    console.log("---->peticiones lanzadas");
    fetchLogData(dispatch, {
      graph: 1,
      date: get(state, 'graph1_date'),
      stationId: get(state, 'graph1_sensor') || 'HOME_INDOOR',
      token: get(state, 'user.token'),
    });
    fetchLogData(dispatch, {
      graph: 2,
      date: get(state, 'graph2_date'),
      stationId: get(state, 'graph2_sensor') || 'HOME_OUTDOOR',
      token: get(state, 'user.token'),
    });
  };

  const prevState = usePrevious({ ...state });

  // useEffect(() => {
  //   const prevDate1 = get(prevState, 'graph1_date');
  //   const prevDate2 = get(prevState, 'graph2_date');
  //   const date1 = get(state, 'graph1_date');
  //   const date2 = get(state, 'graph2_date');

  //   if (!prevDate1 && date1) {
  //     makeRequests();
  //   }
  // }, [...Object.values(state)]);

  useEffect(() => {
    /*
    First current conditions component must get updated, this way second
    request uses current date
    */
    if (requestCount <= 1) {
      const currentDate = moment.tz(new Date(), 'Europe/Madrid');
      const lastRegisteredDate = get(state, 'currentConditions.date');
      const lastRegisteredDateObj = moment.tz(
        lastRegisteredDate, 'DD-MM-YYYY HH:mm:ss', 'Europe/Madrid',
      );
      const diff = currentDate.diff(lastRegisteredDateObj, 'minutes');
      if (get(state, 'user.token') && !get(state, 'loading')
        && (!lastRegisteredDate || diff >= 15)) {
        makeRequests();
        setRequestCount(requestCount + 1);
      }
    }
  }, [...Object.values(state)]);

  console.log("RENDERIZADO")

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        { state.loading && <CircularProgress /> }
        <DateSelector graph={1} defaultSensor="HOME_INDOOR" />
        <DateSelector graph={2} defaultSensor="HOME_OUTDOOR" />
        <div>
          <Button
            color="primary"
            endIcon={<Icon>search</Icon>}
            onClick={state.user ? makeRequests : openLogin}
            size="large"
            variant="contained"
          >
            Visualizar
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SearchFrom;

SearchFrom.propTypes = {
  setFormOpen: PropTypes.func,
};
