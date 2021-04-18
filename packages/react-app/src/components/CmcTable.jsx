import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function CmcTable({portfolio_data}) {

  const classes = useStyles();
  //might need to delete setRows
  const [rows, setRows] = useState(portfolio_data)
  console.log(rows)

  return (
    <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table" align="center">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Symbol</TableCell>
          <TableCell align="right">Price</TableCell>
          <TableCell align="right">Time/Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row._id}>
            <TableCell component="th" scope="row">{row.name}</TableCell>
            <TableCell align="right">{row.symbol}</TableCell>
            <TableCell align="right">{row.price}</TableCell>
            <TableCell align="right">{row.create_date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}