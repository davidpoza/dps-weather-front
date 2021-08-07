import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    fontSize: '0.8em',
    display: 'flex',
    marginTop: '10px',
    alignItems: 'flex-end',
  },
  col: {
    padding: '12px',
    textAlign: 'center',
  },
  moonImage: {
    width: '100px',
  },
  sunImage: {
    width: '102px',
  },
  clock: {
    '& > .text': {
      fontSize: '12px',
      marginBottom: '1em',
    },
    fontSize: '1.5em',
    backgroundColor: '#e8e8f3',
    borderRadius: '5px',
    padding: '5px',
  },
}));
