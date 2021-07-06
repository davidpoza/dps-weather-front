import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TabPanel from '@material-ui/lab/TabPanel';
import TableRow from '@material-ui/core/TableRow';

import useStyles from './useStyles';
import { transformDateToLocaleDay } from '../../../../helpers/utils';

function TableCol({ data }) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableBody>
          {
            data?.map((row) => (
              <TableRow key={row.name}>
                <TableCell
                  classes={{ root: classes.dateCell }}
                  scope="row"
                >
                  { transformDateToLocaleDay(row.date * 1000) }
                </TableCell>
                <TableCell
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
        <TableCol data={data?.slice(0, 8)} />
        <TableCol data={data?.slice(8, 16)} />
      </div>
    </TabPanel>
  );
}
