import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  rootSpaceBetween: {
    height: '340px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  rootCenter: {
    height: '340px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
    width: '100%',
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
