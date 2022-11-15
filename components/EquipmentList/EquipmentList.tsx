import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

import emptySvg from '../../public/empty.svg';
import { FormType } from '../EquipmentForm';

import styles from './EquipmentList.module.css';

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

type Props = {
  dispatch: React.Dispatch<Action>;
  items: Array<FormType>;
};

const EquipmentList = ({ dispatch, items }: Props) => {

  const deleteRow = (index) => {
    dispatch({ type: 'delete', payload: index });
  }

  return (
    <>
      <Typography variant="h5" component="h3">
        Equipment List
      </Typography>
      {items?.length > 0 ? (
        <TableContainer component={Paper} sx={{ marginTop: '2rem' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>Equipment Name</StyledTableCell>
                <StyledTableCell align="right">Sensor Name</StyledTableCell>
                <StyledTableCell align="right">Sensor Setpoint</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
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
                  <StyledTableCell align="right">
                    <Button type="button" variant="contained" onClick={() => deleteRow(index)}>
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Stack gap={2} spacing={2} sx={{ maxWidth: 500, margin: 'auto' }}>
          <Image src={emptySvg} alt="No data" className={styles.img} priority />
          <Typography variant="h5" color="primary.dark" marginTop={5}>
            No Data. Add to get started
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default EquipmentList;
