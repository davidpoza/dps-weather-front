import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import get from 'lodash.get';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Store from '../../reducers/store';
import useStyles from './useStyles';
import DrawerItem from '../drawer-item';

function sortByDate(a, b) {
  const date1 = moment(a.date, 'DD-MM-YYYY HH:mm');
  const date2 = moment(b.date, 'DD-MM-YYYY HH:mm');
  if (date1.isBefore(date2)) {
    return (1);
  }
  if (date2.isBefore(date1)) {
    return (-1);
  }
  return (0);
}

export default function Drawer(props) {
  const { drawerIsOpen, setDrawerOpen } = props;
  const classes = useStyles();
  const [state, dispatch] = useContext(Store);

  const toggleDrawer = useCallback(() => {
    setDrawerOpen(!drawerIsOpen);
  }, [setDrawerOpen, drawerIsOpen]);

  const list = () => (
    <List className={classes.list}>
      {
        Object.keys(state.history)
          .map((id) => (state.history[id]))
          .sort(sortByDate)
          .map((obj) => (
            <DrawerItem
              commentCount={get(obj, 'comments', []).length}
              date={get(obj, 'date')}
              id={get(obj, 'id')}
              imageUrl={get(obj, 'imageLink')}
              key={get(obj, 'id')}
              keywords={get(obj, 'keywords')}
              title={get(obj, 'videoTitle')}
              userLink={get(obj, 'userLink')}
              userName={get(obj, 'userName')}
              videoId={get(obj, 'videoId')}
              videoLink={`https://www.youtube.com/watch?v=${get(obj, 'videoId')}`}
            />
          ))
      }
    </List>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor="left"
        open={drawerIsOpen}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        <Typography className={classes.title} variant="h6" component="h2">
          Search history
        </Typography>
        {list()}
      </SwipeableDrawer>
    </div>
  );
}

Drawer.propTypes = {
  setDrawerOpen: PropTypes.func,
  drawerIsOpen: PropTypes.bool,
};
