import React, {
  useState, useContext, useCallback, useEffect,
} from 'react';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import useStyles from './useStyles';
// import { setGraphDate, setGraphSensor } from '../../actions/chart-actions';
import Store from 'reducers/store';

function DateSelector(props) {
  const { defaultSensor, graph } = props;
  const [state, dispatch] = useContext(Store);
  const [sensorId, setSensorId] = useState(defaultSensor);
  const [date, setDate] = useState(new Date());
  const classes = useStyles();
  const dateFns = new DateFnsUtils();

  const dateAsString = (d) => (
    dateFns.format(d, 'yyyy-MM-dd')
  );

  useEffect(() => {
    const dateString = dateAsString(date);
    if (dateString !== get(state, `graph${graph}_date`)) {
      // setGraphDate(dispatch, { graph, date: dateString });
    }
  }, []);


  const handleChangeSensorId = (event) => {
    if (event.target.value !== '') {
      setSensorId(event.target.value);
      // setGraphSensor(dispatch, { graph, sensorId: event.target.value });
    }
  };

  const handleChangeDate = (value) => {
    if (value) {
      setDate(value);
      // setGraphDate(dispatch, { graph, date: dateAsString(value) });
    }
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
          <MenuItem value="BEDROOM">Habitación David</MenuItem>
          <MenuItem value="BEDROOM2">Habitación Luis y Elena</MenuItem>
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
