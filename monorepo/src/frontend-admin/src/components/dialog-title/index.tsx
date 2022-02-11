import { Box, Typography, IconButton } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';

import CloseIcon from '@material-ui/icons/Close';

interface Props {
  onClose(): void;
}

const DialogTitle: React.FunctionComponent<Props> = ({ children, onClose }) => (
  <MuiDialogTitle>
    <Box display="flex" justifyContent="space-between" flexDirection="row">
      <Typography variant="h5">{children}</Typography>
      <IconButton color="secondary" onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Box>
  </MuiDialogTitle>
);

export default DialogTitle;
