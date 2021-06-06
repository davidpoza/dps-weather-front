import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    height: '240px',
    width: '350px',
  },
  modeSelector: {
    marginTop: '1em',
    marginBottom: '1em',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '1em',

    },
  },
}));
