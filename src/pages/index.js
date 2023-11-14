import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { ReversalsTable } from 'src/sections/reversals/reversals-table';
import { applyPagination } from 'src/utils/apply-pagination';
import { useSelection } from 'src/hooks/use-selection';
import { useState,useMemo,useCallback } from 'react';
import { OverviewFailedReversals } from 'src/sections/overview/overview-failed-tab';
import { useGetReversalsQuery } from 'src/services/api';

const now = new Date();

const data = [
  {
   "transDate": "08\/21\/2023",
   "transReference": 316977752,
   "transType": "CDP",
   "transAmount": 4980000,
   "revType": "Repeat",
   "revStatus": "Failed",
   "issuerBank": "FTBLUGKA",
   "acquirerBank": "AFRIUGKA"
  },
  {
   "transDate": "08\/21\/2023",
   "transReference": 354594879,
   "transType": "CDP",
   "transAmount": 50000,
   "revType": "Non Repeat",
   "revStatus": "Failed",
   "issuerBank": "FTBLUGKA",
   "acquirerBank": "CERBUGKA"
  },
  {
   "transDate": "08\/21\/2023",
   "transReference": 348402838,
   "transType": "CDP",
   "transAmount": 100000,
   "revType": "Non Repeat",
   "revStatus": "Failed",
   "issuerBank": "FTBLUGKA",
   "acquirerBank": "FTBLUGKA"
  },
  {
   "transDate": "08\/21\/2023",
   "transReference": 452568097,
   "transType": "CDP",
   "transAmount": 2200000,
   "revType": "Non Repeat",
   "revStatus": "Failed",
   "issuerBank": "FTBLUGKA",
   "acquirerBank": "FTBLUGKA"
  },
  {
   "transDate": "08\/21\/2023",
   "transReference": 802225841,
   "transType": "CDP",
   "transAmount": 41000,
   "revType": "Non Repeat",
   "revStatus": "Failed",
   "issuerBank": "FTBLUGKA",
   "acquirerBank": "HFINUGKA"
  },
  {
   "transDate": "08\/21\/2023",
   "transReference": 258800395,
   "transType": "CDP",
   "transAmount": 50000,
   "revType": "Repeat",
   "revStatus": "Failed",
   "issuerBank": "FTBLUGKA",
   "acquirerBank": "FTBLUGKA"
  },
  {
   "transDate": "08\/21\/2023",
   "transReference": 903610788,
   "transType": "CWD",
   "transAmount": 100000,
   "revType": "Repeat",
   "revStatus": "Failed",
   "issuerBank": "KCBLUGKA",
   "acquirerBank": "HFINUGKA"
  },
  {
   "transDate": "08\/21\/2023",
   "transReference": 407112116,
   "transType": "CDP",
   "transAmount": 100000,
   "revType": "Non Repeat",
   "revStatus": "Successful",
   "issuerBank": "KCBLUGKA",
   "acquirerBank": "DTKEUGKA"
  },
  {
   "transDate": "08\/21\/2023",
   "transReference": 365342800,
   "transType": "CDP",
   "transAmount": 260000,
   "revType": "Repeat",
   "revStatus": "Failed",
   "issuerBank": "FTBLUGKA",
   "acquirerBank": "FTBLUGKA"
  },
  {
   "transDate": "08\/21\/2023",
   "transReference": 920774853,
   "transType": "CWD",
   "transAmount": 50000,
   "revType": "Repeat",
   "revStatus": "Failed",
   "issuerBank": "KCBLUGKA",
   "acquirerBank": "DTKEUGKA"
  }
 ]

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

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  /* const customersSelection = useSelection(customersIds); */

  const {data:reversals,isFetching,isLoading} = useGetReversalsQuery()
  

  /* const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  ); */

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );
  return (
  <>
    <Head>
      <title>
        ABC Recon | Monitoring
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={6}
          >
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="89M"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={6}
          >
            <OverviewTotalCustomers
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value="50M"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={6}
          >
            <OverviewFailedReversals
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value="39M"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={6}
          >
            <OverviewTotalProfit
              sx={{ height: '100%' }}
              value="40.5M"
            />
          </Grid>
          
        </Grid>
        {/* <Box mt={3}>

        <ReversalsTable
              isLoading={isLoading || isFetching}

              items={reversals?reversals:[]}
            />

        </Box> */}
      </Container>
    </Box>

  </>
)};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
