import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import { ErrorModel } from '../../../models/error.model';
import { generateErrorMessage } from '../../../utils/generate-error-message';

interface DeleteBookingProps {
  onDelete(): Promise<void>;
}

const DeleteBooking = ({ onDelete }: DeleteBookingProps) => {
  const [open, setOpen] = useState(false);

  const [isLoading, setisLoading] = useState(false);
  const [errorMessge, seterrorMessge] = useState('');

  const cancel = async () => {
    setisLoading(true);
    seterrorMessge('');
    try {
      await onDelete();
      setisLoading(false);
      setOpen(false);
    } catch (e) {
      seterrorMessge(generateErrorMessage(e as ErrorModel));
      setisLoading(false);
    }
  };

  return (
    <>
      <Button color="secondary" onClick={() => setOpen(true)}>
        Cancel this booking
      </Button>
      <Dialog open={open} onClose={() => setOpen(true)}>
        <DialogTitle>Cancel booking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Click on continue to cancel and delete the booking. This operation
            cannot be undone.
            {errorMessge ? (
              <Typography color="error">{errorMessge}</Typography>
            ) : undefined}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={cancel}
            color="primary"
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size="small" /> : 'Continue'}
          </Button>
          <Button
            onClick={() => setOpen(false)}
            color="secondary"
            autoFocus
            variant="contained"
            disabled={isLoading}
          >
            Go back
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteBooking;
