import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import AlertBar from '../alert-bar';
import SearchForm from '../search-form';
import Store from '../../reducers/store';
import useStyles from './useStyles';
import Chart from '../chart';

function SearchScreen(props) {
  const { setFormOpen } = props;
  const [state, dispatch] = useContext(Store);
  const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    if (state.lastSearchId) {
      history.push(`/results/${state.lastSearchId}`);
      dispatch({ type: 'CLEAN_LAST_SEARCH_ID' });
    }
  }, [state.lastSearchId, dispatch, history]);
  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={12} md={8} xl={6}>
        <Chart
          data1={state.graph1_points}
          data2={state.graph2_points}
          sensor1={state.graph1_sensor}
          sensor2={state.graph2_sensor}
        />
        <SearchForm setFormOpen={setFormOpen} />
        <AlertBar msg={state.msg} error={state.error} />
      </Grid>
    </Grid>
  );
}

export default SearchScreen;

SearchScreen.propTypes = {
  setFormOpen: PropTypes.func,
};
