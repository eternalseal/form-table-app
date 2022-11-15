import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React, { useContext } from 'react';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type ToastInput = {
  message: string;
  type?: AlertProps['color'];
};

type ToastContextType = {
  toast: ({ message, type }: ToastInput) => void;
};

const ToastContext = React.createContext<ToastContextType>({
  toast: ({}) => {},
});

type Props = {
  children: React.ReactNode;
};

const ToastProvider = ({ children }: Props) => {
  const [showToast, setShowToast] = React.useState(false);
  const [toastType, setToastType] = React.useState<AlertProps['color']>('info');
  const [message, setMessage] = React.useState('');

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowToast(false);
  };

  const makeToast = React.useCallback(({ message, type }: ToastInput) => {
    setMessage(message);
    if (type) {
      setToastType(type);
    }
    setShowToast(true);
  }, []);

  return (
    <ToastContext.Provider value={{ toast: makeToast }}>
      {children}
      <Snackbar open={showToast} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={toastType}
          sx={{ width: '100%', color: '#fff' }}
          data-testid="toast"
        >
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

function useToast() {
  const context = useContext(ToastContext);
  if (context == null) {
    throw new Error('useToast must be within ToastProvider');
  }
  return context.toast;
}

export { ToastProvider, useToast };
