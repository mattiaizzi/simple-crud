import { Color } from '@material-ui/lab/Alert';

export interface AlertState {
  isOpen: boolean;
  severity?: Color | undefined;
  message?: string;
}

export interface OpenPayload {
  severity: Color | undefined;
  message: string;
}

export type AlertAction = { type: 'open'; payload: OpenPayload } | { type: 'close' };

export const alertReducer = (state: AlertState, action: AlertAction): AlertState => {
  switch (action.type) {
    case 'open':
      return { isOpen: true, ...action.payload };
    case 'close':
      return { isOpen: false };
  }
};
