import React, { useContext } from 'react';
import moment from 'moment-timezone/builds/moment-timezone-with-data';
import Store from 'reducers/store';
import Chart from 'components/chart';
import WidgetBase from '../base';

export default function HumidityChart() {
  const [state] = useContext(Store);

  const date = moment().format('YYYY-MM-DD');
  return (
    <WidgetBase title="Evolución de humedad">
      <Chart
        charts={[
          {
            sensorId: 'Terraza',
            data: state?.graphs?.HOME_OUTDOOR?.[date],
          },
          {
            sensorId: 'Salón',
            data: state?.graphs?.HOME_INDOOR?.[date],
          },
          {
            sensorId: 'Habitación David',
            data: state?.graphs?.BEDROOM?.[date],
          },
          {
            sensorId: 'Habitación Luis y Elena',
            data: state?.graphs.BEDROOM2?.[date],
          },
        ]}
        date={date}
        mode="humidity"
        marginTop={5}
        marginRight={20}
        marginBottom={110}
        marginLeft={60}
      />
    </WidgetBase>
  );
}
