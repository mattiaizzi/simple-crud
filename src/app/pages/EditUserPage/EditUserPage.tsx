import { CircularProgress, Paper, Typography } from '@material-ui/core';

import React, { useContext, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { RouteComponentProps, useHistory } from 'react-router';
import { getUser, saveUser } from '../../core/api/users';
import { AlertContext } from '../../core/context/AlertContext';
import { User, User as UserModel } from '../../models/user';
import { UserForm } from '../../shared/UserForm/UserForm';

interface UserProps {
  id: string;
}

export const EditUserPage: React.FC<RouteComponentProps<UserProps>> = ({ match }) => {
  const id = match.params.id;
  const history = useHistory();
  const { dispatch } = useContext(AlertContext);
  const { data, refetch, isLoading } = useQuery<UserModel, Error>(['getUser'], () => getUser(id), {
    enabled: false,
  });
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

  useEffect(() => {
    refetch();
  }, [refetch, match.params.id]);

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
    </Paper>
  );
};
