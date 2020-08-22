import React, {
  useState, useCallback, useContext, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Store from '../../reducers/store';
import { cleanAlertBar } from '../../actions/comments-actions';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AlertBar({ msg, error }) {
  const [state, dispatch] = useContext(Store);
  const [open, setOpen] = useState(false);
  const handleOnClose = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      cleanAlertBar(dispatch);
    }, 200); // to avoid showing empty bar
  }, [setOpen, dispatch]);
  useEffect(() => {
    if (msg !== '') {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [msg]);

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleOnClose}>
      <Alert severity={error ? 'error' : 'success'} onClose={handleOnClose}>
        { msg }
      </Alert>
    </Snackbar>
  );
}

AlertBar.propTypes = {
  msg: PropTypes.string,
  error: PropTypes.bool,
};
