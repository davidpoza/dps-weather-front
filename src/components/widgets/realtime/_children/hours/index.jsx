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

export default function HoursTab({ value, data }) {
  console.log(data)
  const classes = useStyles();
  return (
    <TabPanel value={value}>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableBody>
            {
              data?.slice(0,7).map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">{transformDateToLocaleDay(row.date * 1000)}</TableCell>
                  <TableCell align="right">{`${row.probability_of_precipitation * 100}%`}</TableCell>
                  {
                    row.rain && <TableCell align="right">{`${row.rain}mm/H`}</TableCell>
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </TabPanel>
  );
}
