import { useState } from 'react';
import Head from 'next/head';

import { Box, Button, CircularProgress, Container, Divider, Skeleton, Stack, SvgIcon, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, Typography } from '@mui/material';

import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';



/* import { CustomersSearch } from 'src/sections/customer/customers-search';
import {FilePlus} from "react-feather" */

import { styled } from '@mui/material/styles';

import { useSnackbar } from 'notistack';
import { File, Upload } from 'react-feather';
import MUIDataTable from 'mui-datatables';
import { useUploadReconFileMutation } from 'src/services/api';
import numeral from 'numeral';
import { format } from 'date-fns';





const ResultsTable = ({data}) =>{
  const columns = [
    /* {name:"ACQUIRER_CODE",label:"ACQUIRER CODE"}, */
    {name:"DATE",label:"DATE"},
    {name:"AMOUNT",label:"AMOUNT", options:{customBodyRender: value =>numeral(value).format("0,00")}},
    {name:"MERGE",label:"MERGE"},
    /* {name:"DATE_TIME",label:"TIME"}, */
    {name:"STATUS",label:"STATUS"},
    /* {name:"RESPONSE_CODE",label:"RESPONSE CODE"}, */
    {name:"TRN_REF",label:"TRAN REF"},
    {name:"TXN TYPE",label:"TXN TYPE"}
  ]

  return <MUIDataTable data={data} 
  columns={columns}
  options={{setTableProps: ()=>{return {size:"small"}}}}
  />
  
}

const ReconsiledResultsTable = ({data}) =>{
  const columns = [
    /* {name:"ACQUIRER_CODE",label:"ACQUIRER CODE"}, */
    {name:"DATE_TIME",label:"DATE",options:{customBodyRender: value => format(new Date(value),"dd-MMM-yyyy")}},
    {name:"ABC REFERENCE",label:"ABC REF"},
    {name:"BATCH"},
    {name:"ISSUER_CODE"},
    {name:"ACQUIRER_CODE"},
    /* {name:"AMOUNT",label:"AMOUNT", options:{customBodyRender: value =>numeral(value).format("0,00")}}, */
    {name:"MERGE",label:"MERGE"},
    /* {name:"DATE_TIME",label:"TIME"}, */
    {name:"STATUS",label:"STATUS"},
    {name:"RESPONSE_CODE",label:"CODE"}, 
    
    
  ]

  return <MUIDataTable data={data} 
  columns={columns}
  options={{setTableProps: ()=>{return {size:"small"}}}}
  />
  
}



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

const ReconSummary = ({data}) =>{

  

  const items = data?[
    {item:"Feedback",value:data.feedback},
    {item:"Reconciled Transactions",value:data.reconciledRows},
    {item:"Unreconciled Transactions",value:data.unreconciledRows},
    {item:"Requested Transactions",value:data.RequestedRows},
    {item:"Uploaded Transactions",value:data.UploadedRows},
    {item:"Date Range",value:data.min_max_DateRange},
  ]:[]
  

  const columns = [{name:"item", label:"Field"},{name:"value",label:"Value"}]
  return <MUIDataTable 
  columns={columns} 
  data={items}
  options={{
    setTableProps: ()=>{return {size:"small"}},
    search:false,
    filter:false,
    confirmFilters:false,
    pagination:false,
    selectableRows:"none",
    responsive:"standard",
    textLabels:{
      body:{
        noMatch: "No data to display, data is only available after reconciliation"
      }
    }
    
    
  }}
  />

}

const FileUpload = ({setData}) =>{

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
          res =>{
            setData(res)
          setFileToProcess(null)
          setProcessing(false)
          enqueueSnackbar("Reconciliation Completed, See Summary For Details",{variant:"success"})
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

const Reconciled = ({data}) =>{
  
  
  
  return <ReconsiledResultsTable data={data?data:[]} />
}

const Unreconciled = ({data}) =>{

  
  
  return <ResultsTable data={data?data:[]} />
}

const Page = () => {
  
  const tabs = [
    {value:"upload",label:"File Upload"},
    {value:"reconciled",label:"Reconciled Transactions"},
    {value:"unreconciled",label:"Unreconciled Transactions"},
    {value:"summary",label:"Summary"},
  ]

  const [data,setData] = useState(null)

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

                      {currentTab == "upload" && <FileUpload setData={setData}/>}
                      {currentTab == "reconciled" && <Reconciled data={data?data.reconciled_data:[]}/>}
                      {currentTab == "unreconciled" && <Unreconciled data={data?data.succunreconciled_data:[]}/>}
                      {currentTab == "summary" && <ReconSummary data={data}/>}
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
