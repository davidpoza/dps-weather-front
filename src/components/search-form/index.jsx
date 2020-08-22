import React, { useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import DateSelector from '../date-selector';
import Store from '../../reducers/store';

function SearchFrom(props) {
  const { setFormOpen } = props;
  const [state, dispatch] = useContext(Store);

  const openLogin = useCallback(() => {
    setFormOpen(true);
  }, [setFormOpen]);

  const classes = useStyles();

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
            // onClick={state.user ? makeRequest : openLogin}
            size="large"
            variant="contained"
            disabled
          >
            Buscar
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
