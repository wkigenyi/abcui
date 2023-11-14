import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { AlertCircle } from 'react-feather';
import Link from 'next/link';

export const OverviewFailedReversals = (props) => {
  const { difference, positive = false, sx, value } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          component={Link}
          href={'/exceptions'}
          sx={{textDecoration:"none"}}
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Exceptions
            </Typography>
            
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <AlertCircle />
            </SvgIcon>
          </Avatar>
        </Stack>
        
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={0.5}
            >
              
              <Typography
                
                variant="body2"
              >
                Exceptions
              </Typography>
            </Stack>
            
            
          </Stack>
        
      </CardContent>
    </Card>
  );
};

OverviewFailedReversals.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  value: PropTypes.string.isRequired,
  sx: PropTypes.object
};

