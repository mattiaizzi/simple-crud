import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { User } from '../../models/user';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

import { usePaginator } from './hooks/usePaginator';
import { UserForm } from './components/UserForm/UserForm';
import { UserTable } from './components/UserTable/UserTable';
import { Modal } from '../../shared/Modal/Modal';
import { Button } from '@material-ui/core';

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
}));

const getAllUsers = () => axios.get<User[]>('http://localhost:8000/users').then((response) => response.data);

export const Users = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, reset } = usePaginator();
  const { data = [], refetch } = useQuery<User[], Error>('getAllUsers', getAllUsers, {
    enabled: false,
    initialData: [],
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleUserSelection = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(undefined);
  };

  const onSubmit = (user: User) => {
    axios.post('http://localhost:8000/users', user).then((response) => {
      reset();
      handleClose();
      refetch();
    });
  };

  return (
    <Paper className={classes.root}>
      <div>
        <Button onClick={() => setOpen(true)} variant="outlined" color="primary">
          Aggiungi
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
      <Modal open={open} onClose={handleClose} title={selectedUser ? 'Modifica utente' : 'Inserisci nuovo utente'}>
        <UserForm user={selectedUser} onSubmit={onSubmit} />
      </Modal>
    </Paper>
  );
};
