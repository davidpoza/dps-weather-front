import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    fontSize: '0.9em',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    margin: '5px',
    minWidth: '22%',
  },
  border: {
    padding: '5px',
    borderRadius: '3px',
    marginBottom: '5px',
    backgroundColor: '#e8e8f3',
  },
  icon: {
    width: '40px',
  },
  currentT: {
    fontSize: '0.9em',
    fontWeight: 'bold',
  },
  minT: {
    fontSize: '0.9em',
    fontWeight: 'bold',
  },
  maxT: {
    fontSize: '0.9em',
    fontWeight: 'bold',
  },
  wind: {
    fontSize: '0.9em',
    fontWeight: 'bold',
    color: '#383644',
    '& > svg': {
      color: '#8a8a8a',
    },
  },
  precipitation: {
    fontSize: '0.9em',
    fontWeight: 'bold',
    color: '#383644',
    '& > svg': {
      color: '#15acf1',
    },
  },
}));
