import React from 'react';
import WidgetBase from '../base';

export default function WindyWidget() {
  return (
    <WidgetBase title="Evolución de precipitaciones en imágenes">
      <iframe
        title="Windy map"
        width="440"
        height="280"
        // eslint-disable-next-line max-len
        src="https://embed.windy.com/embed2.html?lat=39.724&lon=-3.472&detailLat=40.660&detailLon=-3.764&width=440&height=250&zoom=5&level=surface&overlay=rain&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1" frameborder="0"
      />
    </WidgetBase>
  );
}
