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
    {name:"rq_rws",label:"Requested Txns"},
    {name:"rq_date_range",label:"Requested Date Range"},
    {name:"upld_rws",label:"Uploaded Txns"},
    {name:"excep_rws",label:"Exception Txns"},
    {name:"recon_rws",label:"Reconciled Txns"},
    {name:"unrecon_rws",label:"Unreconciled Txns"},
    {name:"feedback",label:"Feedback"},
    
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


