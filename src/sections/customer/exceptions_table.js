import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Skeleton,
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
import MUIDataTable from 'mui-datatables';

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

  
  

  const columns = [
    {name:"DATE_TIME",label:"Time"},
    {name:"TRN_REF",label:"TRN Ref"},
    {name:"TXN_TYPE",label:"TRN Type"},
    {name:"ISSUER",label:"Issuer"},
    {name:"ACQUIRER",label:"Acquirer"},
    {name:"AMOUNT",label:"Amount"},
    {name:"TRANSACTION_STATUS",label:"Status"},
    {name:"LEG1_STATUS",label:"L1"},
    {name:"LEG2_STATUS",label:"L2"},
  ]

  

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          {exceptions?<MUIDataTable 
          data={exceptions} 
          columns={columns}/>:<Skeleton/>}
          
        </Box>
      </Scrollbar>
      
    </Card>
  );
};


