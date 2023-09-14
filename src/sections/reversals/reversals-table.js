import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
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

export const ReversalsTable = (props) => {
  const {
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

  

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  return (
    <Card>
      <CardHeader title="Latest Reversals"/>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table >
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
                  Transaction Date
                </TableCell>
                <TableCell>
                  Reference
                </TableCell>
                <TableCell>
                  Type
                </TableCell>
                <TableCell>
                  Amount
                </TableCell>
                <TableCell>
                  Reversal Type
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Issuer Bank
                </TableCell>
                <TableCell>
                  Acquirer Bank
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const isSelected = selected.includes(customer.id);
                

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
                      {customer.transDate}
                    </TableCell>
                    <TableCell>
                      {customer.transReference}
                    </TableCell>
                    <TableCell>
                      {customer.transType}
                    </TableCell>
                    <TableCell>
                      {customer.transAmount}
                    </TableCell>
                    <TableCell>
                      {customer.revType}
                    </TableCell>
                    <TableCell>
                      {customer.revStatus}
                    </TableCell>
                    <TableCell>
                      {customer.issuerBank}
                    </TableCell>
                    <TableCell>
                      {customer.acquirerBank}
                    </TableCell>
                  </TableRow>
                );
              })}
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


