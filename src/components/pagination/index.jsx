import React from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import Config from '../../config';
import useStyles from './useStyles';

export default function MyPagination(props) {
  const { commentCount } = props;
  const classes = useStyles();
  const { pag, searchId } = useParams();
  const pagInt = pag ? parseInt(pag, 10) : 1;
  return (
    <div className={classes.root}>
      <Pagination
        page={pagInt}
        count={Math.ceil(commentCount / Config.commentsPerPage)}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/results/${searchId}/${item.page === 1 ? '' : `${item.page}`}`}
            {...item}
          />
        )}
      />
    </div>
  );
}

MyPagination.propTypes = {
  commentCount: PropTypes.number,
};
