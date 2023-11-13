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
    
  } = props;

  
  

  const columns = [
    {name:"rq_rws",label:"ABC Transactions"},
    {name:"rq_date_range",label:"Requested Date Range"},
    {name:"upld_rws",label:"Uploaded Transactions"},
    {name:"excep_rws",label:"Exceptions"},
    {name:"recon_rws",label:"Reconciled Transactions"},
    {name:"unrecon_rws",label:"Unreconciled Transactions"},
    {name:"feedback",label:"Comment"},
    
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


