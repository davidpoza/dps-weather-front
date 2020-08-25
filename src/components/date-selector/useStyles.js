import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    marginBottom: '40vh',
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  control: {
    [theme.breakpoints.up('sm')]: {
      margin: '1em',
    },
  },
}));
