import { Paper, Snackbar, Typography } from '@material-ui/core';
import React, { useReducer } from 'react';
import Alert, { Color } from '@material-ui/lab/Alert';
import { User } from '../../models/user';
import { UserForm } from '../../shared/UserForm/UserForm';
import { useHistory } from 'react-router';
import { saveUser } from '../../core/api/users';
import { useMutation } from 'react-query';

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

export const CreateUserPage: React.FC = () => {
  const [{ isOpen, message, severity }, dispatch] = useReducer(alertReducer, { isOpen: false });
  const history = useHistory();
  const saveUserMutation = useMutation(saveUser);
  const onSubmit = (user: User) => {
    saveUserMutation
      .mutateAsync(user)
      .then((response) => {
        dispatch({
          type: 'open',
          payload: { message: `L'utente ${response.name} è stato salvato con successo`, severity: 'success' },
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
  const handleClose = () => dispatch({ type: 'close' });
  return (
    <Paper elevation={3}>
      <Typography style={{ padding: '0.5em' }} variant="h6">
        AGGIUNGI UN NUOVO UTENTE
      </Typography>
      <UserForm onSubmit={onSubmit} />
      <Snackbar open={isOpen} autoHideDuration={2000} onClose={handleClose}>
        <Alert elevation={6} variant="filled" onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};
