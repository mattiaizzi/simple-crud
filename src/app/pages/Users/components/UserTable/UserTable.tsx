import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { User } from '../../../../models/user';
import { columns } from './user-table.constants';

interface UserTableProps {
  users: User[];
  onSelectUser?: (user: User) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, onSelectUser }) => (
  <TableContainer>
    <Table stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column.field} align={column.align} style={{ minWidth: column.minWidth }}>
              {column.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((row) => {
          return (
            <TableRow
              hover
              role="checkbox"
              tabIndex={-1}
              key={row.id}
              onClick={() => {
                if (onSelectUser) {
                  onSelectUser(row);
                }
              }}
            >
              {columns.map((column) => {
                const value = row[column.field];
                return (
                  <TableCell key={`${row.id}_${column.field}`} align={column.align}>
                    {column.format ? column.format(value) : value}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </TableContainer>
);
