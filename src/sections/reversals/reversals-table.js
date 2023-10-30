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

  const computeReversalType = item =>{
    let status = "";
    switch(item.request_type){

      case "1420": 
        status = "Reversal";
        break;
      case "1421":
        status = "Repeat Reversal";
        break;
      

    }
    return status
  }
  
  const computeStatusType = item =>{
    let status = "";
    if(!item.response_code){
      status = "Pending"
    }else if(item.response_code== '0' || item.response_code == '00'){
      status = "Successful"
    }else{
      status = "Failed"
    }
    
    return status
  }

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
    {name:"Request_type",label:"Reversal Type", options:{
      customBodyRenderLite: index => computeReversalType(items[index])
    }},
    
    {name:"issuer",label:"Issuer"},
    {name:"acquirer",label:"Acquirer"},
    {name:"txn_type",label:"Transaction Type"},
    {name:"Status",label:"Status", options:{
      customBodyRenderLite: index => computeStatusType(items[index])
    }},
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


