import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
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


export const ReversalsTable = ({items,isLoading}) => {
  

  const columns = [
    {name:"date_time",label:"Time"},
    {name:"trn_ref",label:"Trn Ref"},
    {name:"trn_type",label:"Trn Type"},
    {name:"amount",label:"Amount"},
    {name:"reversal_type",label:"Reversal Type"},
    {name:"transaction_status",label:"Transaction Status"},
    {name:"issuer",label:"Issuer"},
    {name:"acquirer",label:"Acquirer"}
  ]

  

  
  return (
    <Card>
      
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          {isLoading? <Skeleton/>:<MUIDataTable data={items} 
          columns={columns}
          options={{setTableProps:()=>{return {size:"small"}}}}
          />}
          
        </Box>
      </Scrollbar>
      
    </Card>
  );
};


