import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';

export const ExceptionsTable = (props) => {
  const {
    exceptions,
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  console.log(exceptions)
  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  Date
                </TableCell>
                <TableCell>
                  Ref
                </TableCell>
                <TableCell>
                  Type
                </TableCell>
                <TableCell>
                  Issuer
                </TableCell>
                <TableCell>
                  Acquirer
                </TableCell>
                <TableCell>
                  Amount
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  L1
                </TableCell>
                <TableCell>
                  L2
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[].map((customer) => {
                const isSelected = selected.includes(customer.id);
                const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={customer.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer.id);
                          } else {
                            onDeselectOne?.(customer.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      
                        
                        {exceptions.DATE_TIME["0"]}
                      
                    </TableCell>
                    <TableCell>
                      Ref her
                    </TableCell>
                    <TableCell>
                      Type 
                    </TableCell>
                    <TableCell>
                      Issuer
                    </TableCell>
                    <TableCell>
                      Acquirer
                    </TableCell>
                    <TableCell>
                      Amount
                    </TableCell>
                    <TableCell>
                      Status
                    </TableCell>
                  </TableRow>
                );
              })}
              {exceptions &&<TableRow
                    hover
                    
                    selected={false}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={false}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(1);
                          } else {
                            onDeselectOne?.(1);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      
                        
                        
                    {exceptions.DATE_TIME["0"]}
                        
                      
                    </TableCell>
                    <TableCell>
                    {exceptions.TRN_REF["0"]}
                    </TableCell>
                    <TableCell>
                    {exceptions.TXN_TYPE["0"]}
                    </TableCell>
                    <TableCell>
                    {exceptions.ISSUER["0"]}
                    </TableCell>
                    <TableCell>
                    {exceptions.ACQUIRER["0"]}
                    </TableCell>
                    <TableCell>
                    {exceptions.AMOUNT["0"]}
                    </TableCell>
                    <TableCell>
                    {exceptions.TRANSACTION_STATUS["0"]}
                    </TableCell>
                    <TableCell>
                    {exceptions.LEG1_STATUS["0"]}
                    </TableCell>
                    <TableCell>
                    {exceptions.LEG2_STATUS["0"]}
                    </TableCell>
                  </TableRow>}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};


