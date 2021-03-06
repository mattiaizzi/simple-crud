import { Button, FormControl, Grid, makeStyles, TextField } from '@material-ui/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import SaveIcon from '@material-ui/icons/Save';
import RefreshIcon from '@material-ui/icons/Refresh';

import { User } from '../../models/user';

interface UserFormProps {
  user?: User;
  onSubmit: (user: User) => void;
  onBack?: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  buttonContainer: {},
}));

export const UserForm: React.FC<UserFormProps> = ({ user = {}, onSubmit, onBack }) => {
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors, isValid, isSubmitted },
  } = useForm<User>({
    defaultValues: user,
  });

  const { name, onBlur, onChange, ref } = register('email', {
    required: 'Required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: 'invalid email address',
    },
  });

  const handleReset = () => {
    setValue('name', '');
    setValue('username', '');
    setValue('email', '');
    setValue('address.city', '');
    setValue('address.street', '');
    setValue('address.zipcode', '');
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={4}>
              <FormControl fullWidth variant="outlined">
                <TextField
                  id="email"
                  helperText={errors.email ? errors.email.message : null}
                  variant="outlined"
                  label="Email"
                  error={!!errors.email}
                  name={name}
                  onBlur={onBlur}
                  onChange={onChange}
                  inputRef={ref}
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth variant="outlined">
                <Controller
                  control={control}
                  rules={{
                    required: 'Required',
                  }}
                  name="name"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                  }) => (
                    <TextField
                      id="name"
                      helperText={error ? error.message : null}
                      variant="outlined"
                      label="Nome"
                      error={!!error}
                      defaultValue={value}
                      onChange={onChange}
                      inputRef={ref}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth variant="outlined">
                <Controller
                  control={control}
                  rules={{
                    required: 'Required',
                  }}
                  name="username"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                  }) => (
                    <TextField
                      id="username"
                      helperText={error ? error.message : null}
                      variant="outlined"
                      label="Username"
                      error={!!error}
                      defaultValue={value}
                      onChange={onChange}
                      inputRef={ref}
                    />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={4}>
              <FormControl fullWidth variant="outlined">
                <Controller
                  control={control}
                  name="address.city"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                  }) => (
                    <TextField
                      id="address.city"
                      helperText={error ? error.message : null}
                      variant="outlined"
                      label="Citt??"
                      error={!!error}
                      defaultValue={value}
                      onChange={onChange}
                      inputRef={ref}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth variant="outlined">
                <Controller
                  control={control}
                  name="address.street"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                  }) => (
                    <TextField
                      id="address.street"
                      helperText={error ? error.message : null}
                      variant="outlined"
                      label="Via"
                      error={!!error}
                      defaultValue={value}
                      onChange={onChange}
                      inputRef={ref}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth variant="outlined">
                <Controller
                  control={control}
                  name="address.zipcode"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                  }) => (
                    <TextField
                      id="address.zipcode"
                      helperText={error ? error.message : null}
                      variant="outlined"
                      label="Cap"
                      error={!!error}
                      defaultValue={value}
                      onChange={onChange}
                      inputRef={ref}
                    />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container item xs={12} direction="row" justify="flex-end" spacing={3}>
            {onBack ? (
              <Grid item>
                <Button type="submit" variant="outlined" color="primary">
                  BACK
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button
                type="submit"
                disabled={!isValid && isSubmitted}
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
              >
                SAVE
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={handleReset} startIcon={<RefreshIcon />}>
                RESET
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
