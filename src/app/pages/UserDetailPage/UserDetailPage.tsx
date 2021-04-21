import { Button, CircularProgress, Grid, Paper, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { RouteComponentProps, useHistory } from 'react-router';
import EditIcon from '@material-ui/icons/Edit';
import BackIcon from '@material-ui/icons/ArrowBack';
import { getUser } from '../../core/api/users';
import { User } from '../../models/user';

interface UserDetailPageProps {
  id: string;
}

export const UserDetailPage: React.FC<RouteComponentProps<UserDetailPageProps>> = ({ match }) => {
  const id = match.params.id;
  const history = useHistory();
  const { data, refetch, isLoading } = useQuery<User, Error>(['getUser'], () => getUser(id), {
    enabled: false,
  });
  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleOnBackClick = () => {
    history.goBack();
  };

  const handleOnEditCLick = () => {
    history.push(`/users/${id}/edit`);
  };

  return (
    <Paper elevation={3}>
      <div style={{ padding: 20 }}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">
                DETTAGLIO UTENTE {data?.name.toLocaleUpperCase()} {data?.username.toLocaleUpperCase()}
              </Typography>
            </Grid>
            <Grid container item xs={12}>
              Pagina di dettaglio di {data?.name} con username {data?.username}
            </Grid>
            <Grid container item xs={12} direction="row" justify="flex-end" spacing={3}>
              <Grid item>
                <Button variant="contained" color="secondary" onClick={handleOnBackClick} startIcon={<BackIcon />}>
                  BACK
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={handleOnEditCLick} variant="contained" color="primary" startIcon={<EditIcon />}>
                  EDIT
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </div>
    </Paper>
  );
};
