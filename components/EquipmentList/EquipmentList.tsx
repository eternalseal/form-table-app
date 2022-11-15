import {
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

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
              <StyledTableCell>Equipment Name</StyledTableCell>
              <StyledTableCell align="right">Sensor Name</StyledTableCell>
              <StyledTableCell align="right">Sensor Setpoint</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row, index) => (
              <StyledTableRow
                key={`${row.equipmentName} ${index}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                data-testid={`equipment-row-${index}`}
              >
                <StyledTableCell component="th" scope="row">
                  {row.equipmentName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.sensorName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.sensorSetPoint}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default EquipmentList;
