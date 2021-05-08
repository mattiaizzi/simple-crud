import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { useReducer } from 'react';
import { alertReducer, AlertAction } from './reducers/alertReducer';

type AlertContextType = {
  dispatch: (action: AlertAction) => void;
};

const defaultContext: AlertContextType = {
  dispatch: () => {},
};

export const AlertContext = React.createContext<AlertContextType>(defaultContext);

export const AlertProvider: React.FC = ({ children }) => {
  const [{ isOpen, message, severity }, dispatch] = useReducer(alertReducer, { isOpen: false });

  const handleClose = () => dispatch({ type: 'close' });

  return (
    <AlertContext.Provider value={{ dispatch }}>
      {children}
      <Snackbar open={isOpen} autoHideDuration={2000} onClose={handleClose}>
        <Alert elevation={6} variant="filled" onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};
