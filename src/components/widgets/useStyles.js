import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    height: '340px',
  },
  header: {
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: '0.8em',

  },
  singleContent: {
    padding: 0,
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
  media: {
    height: 0,
    paddingTop: '60%',
  },
  panoramicMedia: {
    height: 0,
    paddingTop: '40%',
  },
}));
