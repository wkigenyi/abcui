import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, CircularProgress, Container, Divider, Skeleton, Stack, SvgIcon, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

/* import { CustomersSearch } from 'src/sections/customer/customers-search';
import {FilePlus} from "react-feather" */
import { applyPagination } from 'src/utils/apply-pagination';
import { ReconciliationsTable } from 'src/sections/customer/reconciliations-table';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import toast, {Toaster} from "react-hot-toast"
import { useSnackbar } from 'notistack';
import { File, Upload } from 'react-feather';
import MUIDataTable from 'mui-datatables';
import { useGetReconciledDataQuery, useGetUnReconciledDataQuery, useUploadFileMutation, useUploadReconFileMutation } from 'src/services/api';

const now = new Date();

const data = [
  
];

const ResultsTable = ({data}) =>{
  const columns = [
    {name:"ACQUIRER_CODE",label:"ACQUIRER CODE"},
    {name:"AMOUNT",label:"AMOUNT"},
    {name:"BATCH",label:"BATCH"},
    {name:"DATE_TIME",label:"TIME"},
    {name:"ISSUER_CODE",label:"ISSUER CODE"},
    {name:"RESPONSE_CODE",label:"RESPONSE CODE"},
    {name:"TRN_REF2",label:"TRAN REF"},
    {name:"TXN_TYPE",label:"TXN TYPE"}
  ]

  return <MUIDataTable data={data} 
  columns={columns}/>
}

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const FileUpload = () =>{

  const [stats,setStats] = useState()
  const [fileToProcess,setFileToProcess] = useState(null)
  const [isProcessing,setProcessing] = useState(false)
  const [uploadFile,{isLoading,data}] = useUploadReconFileMutation()

  

  const {enqueueSnackbar} = useSnackbar()

  
  


  const handleFileProcess = async() =>{
    
    
    if(fileToProcess){
      setProcessing(true)
      try{
        const formData = new FormData()
        formData.append("file",fileToProcess)
      
        await uploadFile(formData).unwrap().then(
          response =>{
          setFileToProcess(null)
          setProcessing(false)
          enqueueSnackbar(`${feedback}, ${ReconciledRows} Reconciled Transactions,
          ${unreconciledRows} unreconciled Transactions,
          ${exceptionsRows} exception transactions,
          
          ${RequestedRows} requested transactions,
          ${UploadedRows} Uploaded Transactions,
          Date Range: ${min_max_DateRange}`,{variant:"success"})
        },
        error =>{
          setProcessing(false)
          enqueueSnackbar("An error occurred",{variant:"error"})
          console.log(error)
        }
      )
      }catch(e){ 
        console.log(e)
        enqueueSnackbar("An error occurred",{variant:"error"})
      }
      
    }else{
      enqueueSnackbar("A file must be uploaded",{variant:"info"})
    }
  }

  const handleFileUpload = (e) =>{

    

    if(e.target.files && e.target.files.length){
      setFileToProcess(e.target.files[0])
    }

  }
  return <Stack spacing={3}>
  
  <Stack
  alignItems="center"
  direction="row"
  spacing={1}
>
  <Stack spacing={1}>
    <Stack alignItems="center"
                  direction="row"
                  spacing={1}>
    <Button
    disabled={isProcessing}
    color="inherit"
    variant='outlined'
    startIcon={(
      <SvgIcon fontSize="small">
        <File />
      </SvgIcon>
    )}
    component={"label"}
  >
    Upload A New File
    <VisuallyHiddenInput type='file' 
    onChange={handleFileUpload} 
    accept=".xls,.xlsx"
    />
  </Button>
    </Stack>
  
  {fileToProcess && <Button
    color="inherit"
    variant='outlined'
    disabled={isProcessing}
    onClick={handleFileProcess}
    startIcon={(
      <SvgIcon fontSize="small">
        <Upload />
      </SvgIcon>
    )}
  >
    Process The selected File
  </Button>}
  {isProcessing && <CircularProgress />}


{stats && <Table>
<TableHead>
<TableRow>
  <TableCell>Reconciliation Stats</TableCell>
</TableRow>
</TableHead>
<TableBody>
<TableRow>
  <TableCell>Requested Transactions</TableCell>
  <TableCell>{stats?.RequestedRows}</TableCell>
</TableRow>
<TableRow>
  <TableCell>Date Range</TableCell>
  <TableCell>{stats?.min_max_DateRange}</TableCell>
</TableRow>
<TableRow>
  <TableCell>Uploaded Transactions</TableCell>
  <TableCell>{stats?.UploadedRows}</TableCell>
</TableRow>
<TableRow>
  <TableCell>Exceptions</TableCell>
  <TableCell>{stats?.exceptionsRows}</TableCell>
</TableRow>

<TableRow>
  <TableCell>UnReconciled Transactions</TableCell>
  <TableCell>{stats?.unreconciledRows}</TableCell>
</TableRow>
<TableRow>
  <TableCell>Feedback</TableCell>
  <TableCell>{stats?.feedback}</TableCell>
</TableRow>
</TableBody>
</Table>}
</Stack></Stack></Stack>
}

const Reconciled = () =>{
  
  const {data,isFetching,isLoading} = useGetReconciledDataQuery()
  
  return isFetching || isLoading ?<Skeleton/>:<ResultsTable data={data?data:[]} />
}

const Unreconciled = () =>{

  const {data,isFetching,isLoading} = useGetUnReconciledDataQuery()
  
  return isFetching || isLoading ?<Skeleton/>:<ResultsTable data={data?data:[]} />
}

const Page = () => {
  
  const tabs = [
    {value:"upload",label:"File Upload"},
    {value:"reconciled",label:"Reconciled Transactions"},
    {value:"unreconciled",label:"Unreconciled Transactions"},
  ]

  const [currentTab,setCurrentTab] = useState("upload")

  const handleTabChange = (event,value) =>{
    
    setCurrentTab(value)
  }

  
  
  
  

  

  return (
    <>
      <Head>
        <title>
          Reconciliations | ABC Recon
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
       <Typography variant="h4" 
       sx={{ml:3}}>
          Reconciliations
        </Typography> 
        <Container maxWidth="xl">
          
                
                <Box mt={3}>
                  <Tabs onChange={handleTabChange}
            scrollButtons="auto"
            value={currentTab}
            variant="scrollable"
            textColor="primary">
                    {tabs.map(a => <Tab key={a.value} 
                    label={a.label} 
                    value={a.value}/>)}
                  </Tabs>
                </Box>
                <Divider/>
                <Box mt={3}>

                      {currentTab == "upload" && <FileUpload/>}
                      {currentTab == "reconciled" && <Reconciled/>}
                      {currentTab == "unreconciled" && <Unreconciled/>}
                </Box>
                
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
