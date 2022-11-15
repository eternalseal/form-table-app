import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';

import { FormType } from '../EquipmentForm';

type Props = {
  items: Array<FormType>;
};

const EquipmentList = ({ items }: Props) => {
  return (
    <>
      <Typography variant="h5" component="h3">
        Equipment List
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: '2rem' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Equipment Name</TableCell>
              <TableCell align="right">Sensor Name</TableCell>
              <TableCell align="right">Sensor Setpoint</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row, index) => (
              <TableRow
                key={`${row.equipmentName} ${index}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.equipmentName}
                </TableCell>
                <TableCell align="right">{row.sensorName}</TableCell>
                <TableCell align="right">{row.sensorSetPoint}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default EquipmentList;
