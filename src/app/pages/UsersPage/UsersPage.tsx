import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import { Button } from '@material-ui/core';

import { usePaginator } from './hooks/usePaginator';
import { UserTable } from './components/UserTable/UserTable';
import { User } from '../../models/user';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import { getAllUsers } from '../../core/api/users';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export const UsersPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePaginator(10);
  const { data = [], refetch } = useQuery<User[], Error>('getAllUsers', getAllUsers, {
    enabled: false,
    initialData: [],
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleUserSelection = (user: User) => {
    history.push(`/users/${user.id}`);
  };

  return (
    <Paper className={classes.root}>
      <div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          onClick={() => history.push('/users/create-user')}
          startIcon={<AddIcon />}
        >
          AGGIUNGI
        </Button>
      </div>
      {data.length === 0 ? (
        <h1>Nessun utente presente</h1>
      ) : (
        <>
          <UserTable
            users={data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
            onSelectUser={handleUserSelection}
          />
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      )}
    </Paper>
  );
};
