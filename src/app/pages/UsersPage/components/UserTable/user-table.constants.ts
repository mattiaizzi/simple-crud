import { TableCellProps } from '@material-ui/core';
import { Address, User } from '../../../../models/user';

interface TableCellConfig<T> extends TableCellProps {
  field: keyof T;
  label: string;
  minWidth?: number;
  format?: (value: any) => string;
}
export const columns: TableCellConfig<User>[] = [
  { field: 'id', label: 'ID', minWidth: 50 },
  { field: 'name', label: 'Nome', minWidth: 100 },
  { field: 'username', label: 'Username', minWidth: 100 },
  { field: 'email', label: 'Email', minWidth: 100 },
  {
    field: 'address',
    label: 'Indirizzo',
    minWidth: 100,
    align: 'right',
    format: (value: Address) => `${value.street}, ${value.city}, ${value.zipcode}`,
  },
];
