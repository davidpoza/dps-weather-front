import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
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
