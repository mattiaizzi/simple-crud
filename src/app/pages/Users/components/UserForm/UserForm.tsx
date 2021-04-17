import {
  Button,
  FormControl,
  Grid,
  makeStyles,
  TextField,
} from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { User } from '../../../../models/user';

interface UserFormProps {
  user?: User;
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

export const UserForm: React.FC<UserFormProps> = ({ user = {} }) => {
  const classes = useStyles();
  const { handleSubmit, control, reset } = useForm<User>({
    defaultValues: user,
  });
  const onSubmit = (user: User) => {
    axios.post('http://localhost:8000/users', user).then((response) => reset());
  };
  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={4}>
              <FormControl fullWidth variant="outlined">
                <Controller
                  control={control}
                  rules={{
                    required: 'Required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'invalid email address',
                    },
                  }}
                  name="email"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                  }) => (
                    <TextField
                      id="email"
                      helperText={error ? error.message : null}
                      variant="outlined"
                      label="Email"
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
                      label="Città"
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
          <Grid item spacing={1}>
            <Button type="submit" variant="outlined" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
