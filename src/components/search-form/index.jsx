import React, { useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import DateSelector from '../date-selector';
import Store from '../../reducers/store';
import { fetchLogData } from '../../actions/chart-actions';

function SearchFrom(props) {
  const { setFormOpen } = props;
  const [state, dispatch] = useContext(Store);

  const openLogin = useCallback(() => {
    setFormOpen(true);
  }, [setFormOpen]);

  const classes = useStyles();

  const makeRequests = () => {
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
