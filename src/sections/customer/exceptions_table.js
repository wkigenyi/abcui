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
import numeral from 'numeral';

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
    
    {name:"tran_date",label:"Transaction Date"},
    {name:"trn_ref",label:"ABC Ref"},
    {name:"batch",label:"BATCH", options:{display:false}},
    {name:"acquirer_code",label:"Acquirer Code"},
    {name:"issuer_code",label:"Issuer Code"},
    {name:"amount",label:"Amount", options:{customBodyRender: value => value? numeral(value).format("0,00"):""}},
    /* {name:"TRANSACTION_STATUS",label:"Status"},
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


