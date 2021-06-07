import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    marginTop: '1rem',
  },
  buttons: {
    justifyContent: 'flex-end',
    padding: 0,
  },
  content: {
    textAlign: 'right',
    padding: '0 16px 0 16px',
  },
  cover: {
    backgroundSize: 'contain',
    transition: 'opacity 1s ease-in-out',
  },
  coverXl: {
    height: 154,
    marginBottom: '6px',
    transition: 'opacity 1s ease-in-out',
  },
  sunrise: {
    marginTop: '20px',
  },
}));
