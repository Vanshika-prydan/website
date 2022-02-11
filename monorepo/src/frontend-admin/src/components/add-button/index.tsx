/* eslint-disable no-unused-vars */
import { Button, ButtonProps, makeStyles } from '@material-ui/core';
import React from 'react';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    verticalAlign: 'center',
    justifyContent: 'space-between'
  },

}));

const AddButton = (props: ButtonProps) => {
  const styles = useStyles();
  const { children, ...rest } = props;
  return (
    <Button color="primary" variant="contained" {...rest} className={styles.box}>
      <AddIcon />
      {children}
    </Button>
  );
};

export default AddButton;
