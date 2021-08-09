import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    overflowX: 'scroll',
    width: '85%',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#fff',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#babac0',
      borderRadius: '16px',
      border: '4px solid #fff',
    },
    '&::-webkit-scrollbar-button': {
      display: 'none',
    },
  },
  updated: {
    marginTop: '15px',
  },
  buttons: {
    justifyContent: 'center',
    padding: 0,
    marginBottom: '20px',
    marginTop: '20px',
  },
}));
