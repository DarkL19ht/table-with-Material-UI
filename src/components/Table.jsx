import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MemberData from "../data/Memberdata";


export default function DataTable() {
  return (
    <TableContainer component={Paper} sx={{width: "70%", m: "auto"}}>
      <Table sx={{ minWidth: "90%", height: "50px", width: "90%", m: "auto"}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Firstname</TableCell>
            <TableCell align="right">Lastname</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Occupation</TableCell>
            <TableCell align="right">Date Of Birth</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {MemberData.map((row) => (
            <TableRow
              key={row.firstName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.firstName}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">{row.occupation}</TableCell>
              <TableCell align="right">{row.dateOfBirth}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}