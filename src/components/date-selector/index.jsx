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

function DateSelector(props) {
  const { defaultSensor } = props;
  const [sensorId, setSensorId] = useState(defaultSensor);
  const [date, setDate] = useState(new Date());
  const classes = useStyles();

  const handleChangeSensorId = (event) => {
    setSensorId(event.target.value);
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
          onChange={setDate}
          animateYearScrolling
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default DateSelector;

DateSelector.propTypes = {
  defaultSensor: PropTypes.string,
};
