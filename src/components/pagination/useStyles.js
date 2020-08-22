import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      margin: '2em',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0.5em',
      marginTop: '2em',
    },
  },
}));
