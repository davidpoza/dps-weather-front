import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  dateCell: {
    fontSize: '0.7em',
    paddingLeft: 10,
    paddingRight: 2,
  },
  cell: {
    fontSize: '0.7em',
    paddingLeft: 2,
    paddingRight: 10,
  },
  tabPanel: {
    width: '90%',
  },
}));
