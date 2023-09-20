import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
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

const now = new Date();

const data = [
  
];

const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

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

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const [stats,setStats] = useState()

  

  const {enqueueSnackbar} = useSnackbar()



  

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const handleFileUpload = async(e) =>{

    

    if(e.target.files && e.target.files.length){
      
      try{
        const formData = new FormData()
      formData.append("file",e.target.files[0])
      formData.append("swift_code","130447")
      await fetch("/api/reconcile",{method:"POST",body:formData}).then(
        response =>{
          response.json().then(
            json_ => {
              try{
                const data = JSON.parse(json_)
              setStats(data)
              enqueueSnackbar(`${data["feedback"]}, Uploaded Rows: ${data["UploadedRows"]},Exceptions:${data["exceptionsRows"]}, Reconciled Rows: ${data["reconciledRows"]}`,{variant:"success"})
              }catch(e){
                enqueueSnackbar("An error occurred",{variant:"error"})
              }
              
            },
            err =>{console.log(err)}
            )
        },
        error =>{
          console.log(error)
        }
      )
      }catch(e){ 
        console.log(e)
      }
      
    }

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
        <Toaster/>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Reconciliations
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    variant='outlined'
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                    component={"label"}
                  >
                    Import Recon File
                    <VisuallyHiddenInput type='file' 
                    onChange={handleFileUpload} 
                    accept=".xls,.xlsx"
                    />
                  </Button>
                  {/* <Button
                    color="inherit"

                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button> */}
                </Stack>
              </Stack>
              
              
            </Stack>
            {/* <CustomersSearch /> */}
            {/* <ReconciliationsTable
              count={data.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            /> */}
            {stats && <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Reconciliation Stats</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Reconciled Rows</TableCell>
                  <TableCell>{stats?.reconciledRows}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Date Range</TableCell>
                  <TableCell>{stats?.min_max_DateRange}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Uploaded Rows</TableCell>
                  <TableCell>{stats?.UploadedRows}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Exceptions</TableCell>
                  <TableCell>{stats?.exceptionsRows}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Reconciled Rows</TableCell>
                  <TableCell>{stats?.unreconciledRows}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>UnReconciled Rows</TableCell>
                  <TableCell>{stats?.unreconciledRows}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Feedback</TableCell>
                  <TableCell>{stats?.feedback}</TableCell>
                </TableRow>
              </TableBody>
            </Table>}
          </Stack>
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
