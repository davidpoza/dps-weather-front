import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    fontSize: '0.8em',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    margin: '5px',
  },
  border: {
    padding: '5px',
    borderRadius: '3px',
    border: '1px solid #c0c0c0',
    marginBottom: '5px',
  },
  icon: {
    width: '40px',
  },
  minT: {
    fontSize: '0.8em',
    fontWeight: 'bold',
    color: '#7bb6c9',
  },
  maxT: {
    fontSize: '0.8em',
    fontWeight: 'bold',
    color: '#ac1058',
  },
  wind: {
    fontSize: '0.8em',
    fontWeight: 'bold',
    color: '#383644',
    '& > svg': {
      color: '#8a8a8a',
    },
  },
  precipitation: {
    fontSize: '0.8em',
    fontWeight: 'bold',
    color: '#383644',
    '& > svg': {
      color: '#15acf1',
    },
  },
}));
