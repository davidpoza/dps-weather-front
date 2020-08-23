export default function createChart({
  points = [], // { x: 0, y: 7}
  stationId,
  date, // DD-MM-YYYY
  id,
}) {
  return ({
    stationId,
    points,
    date,
    id,
  });
}
