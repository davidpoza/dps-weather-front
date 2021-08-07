import React, { useContext } from 'react';
import moment from 'moment-timezone/builds/moment-timezone-with-data';
import Store from 'reducers/store';
import Chart from 'components/chart';
import WidgetBase from '../base';

export default function TemperatureChart() {
  const [state] = useContext(Store);

  const date = moment().format('YYYY-MM-DD');
  return (
    <WidgetBase title="Rachas de viento">
      <Chart
        charts={[
          {
            sensorId: 'Terraza',
            data: state.graphs?.HOME_OUTDOOR?.[date],
          },
        ]}
        date={date}
        mode="wind"
        marginTop={5}
        marginRight={20}
        marginBottom={70}
        marginLeft={40}
      />
    </WidgetBase>
  );
}
