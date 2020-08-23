import React, { useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import useStyles from './useStyles';
import { setGraphDate, setGraphSensor } from '../../actions/chart-actions';
import Store from '../../reducers/store';

function DateSelector(props) {
  const { defaultSensor, graph } = props;
  const [state, dispatch] = useContext(Store);
  const [sensorId, setSensorId] = useState(defaultSensor);
  const [date, setDate] = useState(new Date());
  const classes = useStyles();
  const dateFns = new DateFnsUtils();

  const handleChangeSensorId = (event) => {
    setSensorId(event.target.value);
    setGraphSensor(dispatch, { graph, sensorId: event.target.value });
  };

  const handleChangeDate = (value) => {
    setDate(value);
    setGraphDate(dispatch, { graph, date: dateFns.format(value, 'yyyy-MM-dd') });
  };

  return (
    <div>
      <FormControl className={classes.control}>
        <InputLabel>Sensor</InputLabel>
        <Select
          value={sensorId}
          onChange={handleChangeSensorId}
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
          value={date}
          onChange={handleChangeDate}
          animateYearScrolling
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default DateSelector;

DateSelector.propTypes = {
  defaultSensor: PropTypes.string,
  graph: PropTypes.number,
};
