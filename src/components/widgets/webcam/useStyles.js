import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    marginTop: '1rem',
  },
  buttons: {
    justifyContent: 'center',
    padding: 0,
    marginBottom: '50px',
  },
  content: {
    textAlign: 'right',
    padding: '0 16px 0 16px',
  },
  media: {
    height: '250px',
    width: '100%',
    transition: 'opacity 1s ease-in-out',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  panoramicMedia: {
    height: '180px',
    width: '100%',
    transition: 'opacity 1s ease-in-out',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
}));
