import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import DollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon"
import { SvgIcon } from '@mui/material';
import { AlertCircle, PieChart,Rewind } from 'react-feather';

export const items = [
  {
    title: 'Dashboard',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Reversals',
    path: '/reversals',
    icon: (
      <SvgIcon fontSize="small">
        <Rewind />
      </SvgIcon>
    )
  },
  
  {
    title: 'Commission / Turnover',
    path: '/commissions',
    icon: (
      <SvgIcon fontSize="small">
        <DollarIcon />
      </SvgIcon>
    )
  },
  /* {
    title: 'Account',
    path: '/account',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  }, */
  {
    title: 'Reconciliations',
    path: '/reconciliations',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Exceptions',
    path: '/exceptions',
    icon: (
      <SvgIcon fontSize="small">
        <AlertCircle />
      </SvgIcon>
    )
  },
  {
    title: 'Statistics',
    path: '/stats',
    icon: (
      <SvgIcon fontSize="small">
        <PieChart />
      </SvgIcon>
    )
  },
  /* {
    title: 'Login',
    path: '/auth/login',
    icon: (
      <SvgIcon fontSize="small">
        <LockClosedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Register',
    path: '/auth/register',
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Error',
    path: '/404',
    icon: (
      <SvgIcon fontSize="small">
        <XCircleIcon />
      </SvgIcon>
    )
  } */
];
