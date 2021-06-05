import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: '33%',
  },
  header: {
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: '0.8em',

  },
  singleContent: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doubleContent: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));
