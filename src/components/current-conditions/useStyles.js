import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    marginTop: '1rem',
  },
  content: {
    padding: '0.5rem',
  },
  data: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
  },
  icon: {
    color: '#5b5d67',
  },
  item: {
    textAlign: 'center',
  },
  date: {
    float: 'left',
    padding: '0.8rem',
    paddingBottom: '1.4rem',
    fontSize: '0.7rem',
  },
  sunrise: {
    float: 'right',
    padding: '0.5rem',
    paddingTop: '1.5rem',
    fontSize: '0.8rem',
  },
}));
