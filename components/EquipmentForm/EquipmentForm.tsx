import { zodResolver } from '@hookform/resolvers/zod';
import { Typography, Stack, TextField, MenuItem, Button } from '@mui/material';
import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';

import { useToast } from '../../Context/ToastContext';
import { Action } from '../../pages';

const ALPHA_NUMERIC_REGEX = /^\w+$/;

type Props = {
  dispatch: React.Dispatch<Action>;
  items: Array<FormType>;
};

const defaultValues = {
  equipmentType: '',
  equipmentName: '',
  sensorType: '',
  sensorName: '',
  sensorSetPoint: 0,
};

const schema = z.object({
  equipmentType: z.string().min(2, 'Please select an option'),
  equipmentName: z
    .string()
    .min(3, 'Equipment name should be at least 3 characters')
    .refine((val) => ALPHA_NUMERIC_REGEX.test(val), {
      message: 'Must be alphanumeric string',
    }),
  sensorType: z.string().min(2, 'Please select an option'),
  sensorName: z.string().refine((val) => ALPHA_NUMERIC_REGEX.test(val), {
    message: 'Must be alphanumeric string',
  }),
  sensorSetPoint: z.number(),
});

export type FormType = z.infer<typeof schema>;

const EquipmentForm = ({ dispatch, items }: Props) => {
  const toast = useToast();
  const { control, handleSubmit, reset, setError } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<FormType> = (data) => {
    const duplicate = items.find(
      (val) =>
        val.equipmentName === data.equipmentName ||
        val.sensorName === data.sensorName,
    );
    if (duplicate) {
      toast({ type: 'error', message: 'Duplicate item' });
      if (duplicate.equipmentName === data.equipmentName) {
        setError('equipmentName', { message: 'Duplicate' });
      }
      if (duplicate.sensorName === data.sensorName) {
        setError('equipmentName', { message: 'Duplicate' });
      }
      return;
    }
    dispatch({ type: 'add', payload: data });
    reset(defaultValues);
    toast({ type: 'success', message: 'Successfully added equipment' });
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
              label="Sensor Setpoint"
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
