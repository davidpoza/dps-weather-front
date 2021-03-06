import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('lg')]: {
      width: '70vw',
      minWidth: '1231px',
      maxWidth: '1333px',
      margin: 'auto',
    },
  },
  logo: {
    textAlign: 'center',
    minWidth: '100%',
    '& img': {
      width: '60%',
      marginBottom: '2em',
      marginTop: '3em',
    },
  },
}));
