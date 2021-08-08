import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TabPanel from '@material-ui/lab/TabPanel';
import TableRow from '@material-ui/core/TableRow';

import { transformDateToLocaleDay } from 'components/helpers/utils';
import useStyles from './useStyles';

function TableCol({ data }) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableBody>
          {
            data?.map((row, i) => (
              <TableRow key={i}>
                <TableCell
                  key="date"
                  classes={{ root: classes.dateCell }}
                  scope="row"
                >
                  { transformDateToLocaleDay(row.date * 1000) }
                </TableCell>
                <TableCell
                  key="temp"
                  classes={{ root: classes.cell }}
                  align="right"
                >
                  {`${Math.trunc(row.temp)}° `}
                  {`${Math.trunc(row.probability_of_precipitation * 100)}%`}
                  { row.rain ? ` ${row.rain}mm/h` : ''}
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function HoursTab({ value, data }) {
  const classes = useStyles();
  return (
    <TabPanel value={value} className={classes.tabPanel}>
      <div className={classes.root}>
        <TableCol key="left" data={data?.slice(0, 8)} />
        <TableCol key="right" data={data?.slice(8, 16)} />
      </div>
    </TabPanel>
  );
}

const dataProptypes = PropTypes.arrayOf(PropTypes.shape({
  name: PropTypes.string,
  date: PropTypes.nmumber,
  temp: PropTypes.number,
  rain: PropTypes.number,
  probability_of_precipitation: PropTypes.number,
}));

HoursTab.propTypes = {
  value: PropTypes.string,
  data: dataProptypes,
};

TableCol.propTypes = {
  data: dataProptypes,
};
