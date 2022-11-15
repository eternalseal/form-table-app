import { zodResolver } from '@hookform/resolvers/zod';
import { Typography, Stack, TextField, MenuItem, Button } from '@mui/material';
import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';

import { Action } from '../../pages';

const ALPHA_NUMERIC_REGEX = /^\w+$/;
type Props = {
  dispatch: React.Dispatch<Action>;
};

const schema = z.object({
  equipmentType: z.string(),
  equipmentName: z.string().refine((val) => ALPHA_NUMERIC_REGEX.test(val), {
    message: 'Must be alphanumeric string',
  }),
  sensorType: z.string(),
  sensorName: z.string().refine((val) => ALPHA_NUMERIC_REGEX.test(val), {
    message: 'Must be alphanumeric string',
  }),
  sensorSetPoint: z.number(),
});

export type FormType = z.infer<typeof schema>;

const EquipmentForm = ({ dispatch }: Props) => {
  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormType> = (data) => {
    dispatch({ type: 'add', payload: data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" component="h2">
        Add Equipment
      </Typography>
      <Stack spacing={2} marginTop={4}>
        <Controller
          control={control}
          name="equipmentType"
          render={({ field, formState }) => (
            <TextField
              variant="outlined"
              id="equipmentType"
              label="Equipment Type"
              ref={field.ref}
              value={field.value}
              onChange={field.onChange}
              select
              error={formState.errors.equipmentType ? true : false}
              helperText={formState.errors.equipmentType?.message}
              fullWidth
            >
              <MenuItem value={'ahu'}>AHU</MenuItem>
              <MenuItem value={'rtu'}>RTU</MenuItem>
              <MenuItem value={'chiller'}>Chiller</MenuItem>
            </TextField>
          )}
        />
        <Controller
          control={control}
          name="equipmentName"
          render={({ field, formState }) => (
            <TextField
              variant="outlined"
              type="text"
              id="equipmentName"
              label="Equipment Name"
              ref={field.ref}
              value={field.value}
              onChange={field.onChange}
              error={formState.errors.equipmentName ? true : false}
              helperText={formState.errors.equipmentName?.message}
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name="sensorType"
          render={({ field, formState }) => (
            <TextField
              variant="outlined"
              id="sensorType"
              label="Sensor Type"
              ref={field.ref}
              value={field.value}
              onChange={field.onChange}
              select
              error={formState.errors.sensorType ? true : false}
              helperText={formState.errors.sensorType?.message}
              fullWidth
            >
              <MenuItem value={'temperature'}>Temperature</MenuItem>
              <MenuItem value={'pressure'}>Pressure</MenuItem>
              <MenuItem value={'humidity'}>Humidity</MenuItem>
            </TextField>
          )}
        />
        <Controller
          control={control}
          name="sensorName"
          render={({ field, formState }) => (
            <TextField
              variant="outlined"
              type="text"
              id="sensorName"
              label="Sensor Name"
              ref={field.ref}
              value={field.value}
              onChange={field.onChange}
              error={formState.errors.sensorName ? true : false}
              helperText={formState.errors.sensorName?.message}
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name="sensorSetPoint"
          render={({ field, formState }) => (
            <TextField
              variant="outlined"
              type="number"
              id="sensorSetPoint"
              label="Sensor Set point"
              ref={field.ref}
              value={field.value}
              onChange={(event) => field.onChange(Number(event.target.value))}
              error={formState.errors.sensorSetPoint ? true : false}
              helperText={formState.errors.sensorSetPoint?.message}
              fullWidth
            />
          )}
        />
      </Stack>

      <Button
        type="submit"
        variant="contained"
        sx={{ marginTop: '2rem' }}
        fullWidth
      >
        Submit
      </Button>
    </form>
  );
};

export default EquipmentForm;
