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

export const StatsTable = (props) => {
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
    {name:"RQ_RWS",label:"Requested Rows"},
    {name:"RQ_DATE_RANGE",label:"Requested Date Range"},
    {name:"UPLD_RWS",label:"Uploaded Rows"},
    {name:"EXCEP_RWS",label:"Exception Rows"},
    {name:"RECON_RWS",label:"Reconciled Rows"},
    {name:"UNRECON_RWS",label:"Unreconciled Rows"},
    {name:"FEEDBACK",label:"Feedback"},
    
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


