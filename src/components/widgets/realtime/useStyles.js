import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  icon: {
    width: '100px',
  },
  value: {
    fontSize: '4em',
  },
  visibility: {
    fontSize: '0.8em',
    textAlign: 'center',
  },
  cloudCover: {
    marginTop: '10px',
    fontSize: '0.8em',
    textAlign: 'center',
  },
  radiation: {
    marginTop: '10px',
    fontSize: '0.8em',
    textAlign: 'center',
  },
  wind: {
    marginTop: '40px',
    textAlign: 'center',
    fontSize: '3em',
    display: 'flex',
    flexDirection: 'row',
    '& .units': {
      fontSize: '0.5em',
    },
  },
  updated: {
    marginTop: '50px',
  },
  pollen: {
    marginTop: '10px',
    fontSize: '0.8em',
    textAlign: 'center',
  },
  tab: {
    fontSize: '0.8em',
    minWidth: 100,
    width: 100,
  },
}));
