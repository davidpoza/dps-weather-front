import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import AlertBar from '../alert-bar';
import SearchForm from '../search-form';
import Store from '../../reducers/store';
import useStyles from './useStyles';


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
      <Grid item xs={10} md={6} xl={3}>
        <div className={classes.logo}>
          <img alt="youtube logo" src={`${process.env.PUBLIC_URL}/youtube-logo.png`} />
        </div>
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
