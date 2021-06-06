import React, { useContext } from 'react';
import moment from 'moment-timezone/builds/moment-timezone-with-data';
import WidgetBase from '../base';
import Store from '../../../reducers/store';
import useStyles from './useStyles';
import Chart from '../../chart';

export default function HumidityChart() {
  const classes = useStyles();
  const [state, dispatch] = useContext(Store);

  function calculateColor(value) {
    if (value > 27) return '#ac1058';
    if (value < 15) return '#7bb6c9';
    return '#46c48d';
  }
  const date = moment().format('YYYY-MM-DD');
  return (
    <WidgetBase title="Evolución de humedad" moreInfo="Inspeccionar">
      <Chart
        charts={[
          {
            sensorId: 'Terraza',
            data: state.graphs.HOME_OUTDOOR[date],
          },
          {
            sensorId: 'Salón',
            data: state.graphs.HOME_INDOOR[date],
          },
        ]}
        date={date}
        mode="humidity"
        marginTop={5}
        marginRight={20}
        marginBottom={70}
        marginLeft={60}
      />
    </WidgetBase>
  );
}
