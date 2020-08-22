import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  error: {
    color: 'red',
    fontStyle: 'italic',
    textAlign: 'center',
    fontWeight: 200,
    margin: '1em',
    '& svg': {
      color: 'red',
      marginRight: '0.2em',
      verticalAlign: 'text-bottom',
    },
  },
}));
