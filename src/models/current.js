export default function createCurrent({
  date,
  outdoorTemp,
  indoorTemp,
  outdootHum,
  indoorHum,
  pressure,
  wind,
}) {
  return ({
    date,
    outdoorTemp,
    indoorTemp,
    outdootHum,
    indoorHum,
    pressure,
    wind,
  });
}
