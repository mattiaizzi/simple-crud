import { Paper, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { User } from '../../models/user';
import { UserForm } from '../../shared/UserForm/UserForm';
import { useHistory } from 'react-router';
import { saveUser } from '../../core/api/users';
import { useMutation } from 'react-query';
import { AlertContext } from '../../core/context/AlertContext/AlertContext';

export const CreateUserPage: React.FC = () => {
  const { dispatch } = useContext(AlertContext);

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
  return (
    <Paper elevation={3}>
      <Typography style={{ padding: '0.5em' }} variant="h6">
        AGGIUNGI UN NUOVO UTENTE
      </Typography>
      <UserForm onSubmit={onSubmit} />
    </Paper>
  );
};
