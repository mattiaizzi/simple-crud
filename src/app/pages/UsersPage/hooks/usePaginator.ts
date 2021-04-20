import React from 'react';

export const usePaginator = (defaultRowsPerPage: number = 5) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);

  const handleChangePage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => void = (
    event,
    newPage
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined = (
    event
  ) => {
    const value = +event.target.value;
    if (!isNaN(value)) {
      setRowsPerPage(value);
      setPage(0);
    }
  };

  const reset = () => {
    setPage(0);
  };

  return { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, reset };
};
