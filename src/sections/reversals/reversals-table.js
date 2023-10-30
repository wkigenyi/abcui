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
import numeral from 'numeral';


export const ReversalsTable = ({items,isLoading}) => {

  console.log(items)
  

  const columns = [
    {name:"date_time",label:"Transaction Date", options:{customBodyRender: value => format(new Date(value),"dd-MMM-yyyy")}},
    {name:"trn_ref",label:"ABC Reference"},
    {
      name:"amount",
      label:"Amount",
      options:{
        setCellProps: ()=>({align:"right",style:{maxWidth:"80px"}}),
        customBodyRender: value => numeral(value).format("0,00"),
      }
    },
    {name:"Request_type",label:"Reversal Type"},
    {name:"transaction_status",label:"Transaction Status",options:{display:false}},
    {name:"issuer",label:"Issuer"},
    {name:"acquirer",label:"Acquirer"},
    {name:"txn_type",label:"Transaction Type"},
    {name:"Status",label:"Status"},
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


