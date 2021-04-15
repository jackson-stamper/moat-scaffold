//app.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import ZapperTable from './table'

export default function App() {
  const [coin, setCoin] = useState([])
  const coins = []

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('mongodb+srv://moat:moatdb@moatfrontend.dix5s.mongodb.net/MoatUI?retryWrites=true&w=majority')
      // console.log(result.data.data)
      setCoin(result.data.data)
    }
    fetchData()
  }, [])


  //gets all the coin names 
  for (let i = 0; i < coin.length; i++) {
    if (coins.includes(coin[i].name)) {
    } else {
      coins.push(coin[i].name)
    }
    }

  return (
  <div>
   <ZapperTable portfolio_data={coin}/>
    {/* //data is not an array */}
    {/* <ul>
      {coin.map(item=> (
        <li key={item._id}>
        <p>
          Name: {item.name}
          <br />
          Symbol: {item.symbol}
          <br />
          Price: {item.price}
          <br />
          Time: {item.create_date}
        </p>
        </li>
      ))}
    </ul> */}
  </div>  
  )

}



//table.js
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

export default function ZapperTable({portfolio_data}) {

  const classes = useStyles();
  //might need to delete setRows
  const [rows] = useState(portfolio_data)
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