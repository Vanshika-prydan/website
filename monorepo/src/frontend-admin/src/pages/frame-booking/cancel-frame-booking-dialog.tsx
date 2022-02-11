import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CircularProgress, Typography } from '@material-ui/core';
import { generateErrorMessage } from '../../utils/generate-error-message';

interface CancelFrameBookingDialogProps {
  onCancel(): Promise<void>;
}

export default function CancelFrameBookingDialog({
  onCancel,
}: CancelFrameBookingDialogProps) {
  const [open, setOpen] = useState(false);

  const [isLoading, setisLoading] = useState(false);
  const [errorMessge, seterrorMessge] = useState('');

  const cancel = async () => {
    setisLoading(true);
    seterrorMessge('');
    try {
      await onCancel();
      setisLoading(false);
      setOpen(false);
    } catch (e) {
      seterrorMessge(generateErrorMessage(e));
      setisLoading(false);
    }
  };

  return (
    <>
      <Button color="secondary" onClick={() => setOpen(true)}>
        Cancel frame booking
      </Button>
      <Dialog open={open} onClose={() => setOpen(true)}>
        <DialogTitle>Cancel subscription</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Click on continue to cancel the subscription
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
}
