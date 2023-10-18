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
    {name:"date_time",label:"Time"},
    {name:"tran_date",label:"Trn Date"},
    {name:"trn_ref",label:"TRN Ref"},
    {name:"batch",label:"BATCH"},
    {name:"acquirer_code",label:"Acquirer"},
    {name:"issuer_code",label:"Issuer"},
    /* {name:"AMOUNT",label:"Amount"},
    {name:"TRANSACTION_STATUS",label:"Status"},
    {name:"LEG1_STATUS",label:"L1"},
    {name:"LEG2_STATUS",label:"L2"}, */
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


