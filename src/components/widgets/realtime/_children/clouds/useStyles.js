import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wind: {
    marginTop: '60px',
    textAlign: 'center',
    fontSize: '3em',
    display: 'flex',
    flexDirection: 'row',
    '& .units': {
      fontSize: '0.5em',
    },
    '& img': {
      width: '100px',
    },
  },
  extendedInfo: {
    fontSize: '0.8em',
    textAlign: 'right',
  },
  tabPanel: {
    width: '90%',
    padding: 0,
  },
  updated: {
    marginTop: '50px',
    textAlign: 'center',
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
}));
