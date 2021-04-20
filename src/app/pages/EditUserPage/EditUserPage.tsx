import { CircularProgress, Paper, Snackbar, Typography } from '@material-ui/core';
import Alert, { Color } from '@material-ui/lab/Alert';
import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { useQuery } from 'react-query';
import { RouteComponentProps, useHistory } from 'react-router';
import { User, User as UserModel } from '../../models/user';
import { UserForm } from '../../shared/UserForm/UserForm';

interface UserProps {
  id: string;
}

interface AlertState {
  isOpen: boolean;
  severity?: Color | undefined;
  message?: string;
}

interface OpenPayload {
  severity: Color | undefined;
  message: string;
}

type AlertAction = { type: 'open'; payload: OpenPayload } | { type: 'close' };

const alertReducer = (state: AlertState, action: AlertAction): AlertState => {
  switch (action.type) {
    case 'open':
      return { isOpen: true, ...action.payload };
    case 'close':
      return { isOpen: false };
  }
};

const getUser = (id: string) =>
  axios.get<UserModel>(`http://localhost:8000/users/${id}`).then((response) => response.data);

export const EditUserPage: React.FC<RouteComponentProps<UserProps>> = ({ match }) => {
  const id = match.params.id;
  const [{ isOpen, message, severity }, dispatch] = useReducer(alertReducer, { isOpen: false });
  const history = useHistory();
  const { data, refetch, isLoading } = useQuery<UserModel, Error>(['getUser'], () => getUser(id), {
    enabled: false,
  });

  const onSubmit = (user: User) => {
    axios
      .post<User>('http://localhost:8000/users', user)
      .then((response) => {
        dispatch({
          type: 'open',
          payload: { message: `L'utente ${response.data.name} è stato salvato con successo`, severity: 'success' },
        });
        setTimeout(() => {
          history.goBack();
        }, 3000);
      })
      .catch((error) =>
        dispatch({
          type: 'open',
          payload: { message: error, severity: 'error' },
        })
      );
  };

  useEffect(() => {
    refetch();
  }, [refetch, match.params.id]);

  const handleClose = () => dispatch({ type: 'close' });
  return (
    <Paper elevation={3}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography style={{ padding: '0.5em' }} variant="h6">
            MODIFICA {data?.name.toLocaleUpperCase()} {data?.username.toLocaleUpperCase()}
          </Typography>
          <UserForm user={data} onSubmit={onSubmit} />
        </>
      )}
      <Snackbar open={isOpen} autoHideDuration={2000} onClose={handleClose}>
        <Alert elevation={6} variant="filled" onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};
