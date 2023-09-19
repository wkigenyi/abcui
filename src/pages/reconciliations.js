import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
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

  const {enqueueSnackbar} = useSnackbar()

  useEffect(()=>{
    fetch("/exceptions?Swift_code_up=130447").then(
      res =>{
        res.json().then(data =>console.log(data),err =>console.log(err))
      },
      err =>{}
    )
  },[])

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
      formData.append("swift_code","AFRIUGKA")
      await fetch("/reconcile",{method:"POST",body:formData}).then(
        response =>{
          response.json().then(
            json_ => {
              const data = JSON.parse(json_)
              console.log(data)
              enqueueSnackbar(`${data["feedback"]}, Uploaded Rows: ${data["UploadedRows"]},Exceptions:${data["exceptionsRows"]}, Reconciled Rows: ${data["reconciledRows"]}`,{variant:"success"})
            }
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
            <ReconciliationsTable
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
            />
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
