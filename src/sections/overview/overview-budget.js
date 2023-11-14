import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { Avatar, Card, CardActionArea, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { Rewind } from 'react-feather';
import Link from "next/link"

export const OverviewBudget = (props) => {
  const { difference, positive = false, sx, value } = props;

  return (
    <Card sx={sx}>
      <CardActionArea>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          component={Link}
          href={"/reversals"}
          sx={{textDecoration:"none"}}
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Reversals
            </Typography>
            
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'info',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <Rewind />
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
                View the status of reversals
              </Typography>
            </Stack>
            
          </Stack>
        
      </CardContent>
      </CardActionArea>
    </Card>
  );
};

OverviewBudget.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired
};
