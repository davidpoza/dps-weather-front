import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  icon: {
    width: '100px',
  },
  value: {
    fontSize: '4em',
  },
  trend: {
    fontSize: '0.8em',
    textAlign: 'center',
  },
  feels: {
    marginTop: '10px',
    fontSize: '0.8em',
    textAlign: 'center',
  },
  humidity: {
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
}));
