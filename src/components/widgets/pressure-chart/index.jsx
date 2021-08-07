import React, { useContext } from 'react';
import moment from 'moment-timezone/builds/moment-timezone-with-data';
import Store from 'reducers/store';
import Chart from 'components/chart';
import WidgetBase from '../base';

export default function TemperatureChart() {
  const [state] = useContext(Store);

  const date = moment().format('YYYY-MM-DD');
  return (
    <WidgetBase title="Evolución de presión atomosférica">
      <Chart
        charts={[
          {
            sensorId: '',
            data: state.graphs?.HOME_INDOOR?.[date],
          },
        ]}
        date={date}
        mode="pressure"
        marginTop={5}
        marginRight={20}
        marginBottom={70}
        marginLeft={60}
      />
    </WidgetBase>
  );
}
