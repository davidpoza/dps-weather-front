import React, { useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';
import Store from '../../reducers/store';
import useStyles from './useStyles';
import { fetchComments } from '../../actions/comments-actions';

function SearchFrom(props) {
  const { setFormOpen } = props;
  const [state, dispatch] = useContext(Store);
  const [sensorId1, setSensorId1] = useState('HOME_OUTDOOR');
  const [sensorId2, setSensorId2] = useState('HOME_INDOOR');
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());

  const handleChangeSensorId1 = (event) => {
    setSensorId1(event.target.value);
  };

  const makeRequest = useCallback(() => {
    // if (videoId && keywords !== '') {
    //   fetchComments(dispatch, { videoId, keywords, token: get(state, 'user.token') });
    //   setVideoUrl('');
    //   setKeywords('');
    // }
  }, [state, dispatch]);

  const openLogin = useCallback(() => {
    setFormOpen(true);
  }, [setFormOpen]);

  const classes = useStyles();

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        { state.loading && <CircularProgress /> }
        <div>
          <FormControl className={classes.control}>
            <InputLabel>Sensor</InputLabel>
            <Select
              value={sensorId1}
              onChange={handleChangeSensorId1}
            >
              <MenuItem value="HOME_OUTDOOR">Exterior</MenuItem>
              <MenuItem value="HOME_INDOOR">Interior</MenuItem>
            </Select>
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            <KeyboardDatePicker
              className={classes.control}
              label="Fecha"
              format="dd/MM/yyyy"
              value={date1}
              onChange={setDate1}
              animateYearScrolling
            />
          </MuiPickersUtilsProvider>
        </div>
        <div>
          <Button
            color="primary"
            endIcon={<Icon>search</Icon>}
            onClick={state.user ? makeRequest : openLogin}
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
