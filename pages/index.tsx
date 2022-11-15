import { AppBar, Box, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

import EquipmentForm, { FormType } from '../components/EquipmentForm';
import EquipmentList from '../components/EquipmentList';

export type Action = { type: string; payload: FormType };

const reducer = (state: Array<FormType>, action: Action): Array<FormType> => {
  switch (action.type) {
    case 'add': {
      return [...state, action.payload];
    }
    case 'delete': {
      const index = state.indexOf(action.payload);
      return [...state.splice(index, 1)];
    }
  }
};

export default function Home() {
  const [state, dispatch] = React.useReducer(reducer, []);

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AppBar position="static" sx={{ padding: '1rem' }}>
        <Link href="/" passHref legacyBehavior>
          <Typography variant="h6" component="a">
            Home
          </Typography>
        </Link>
      </AppBar>
      <Grid container spacing={4} marginTop={8} padding={4}>
        <Grid item xs={12} md={4}>
          <EquipmentForm dispatch={dispatch} items={state} />
        </Grid>
        <Grid item xs={12} md={6}>
          <EquipmentList dispatch={dispatch} items={state} />
        </Grid>
      </Grid>
    </Box>
  );
}
