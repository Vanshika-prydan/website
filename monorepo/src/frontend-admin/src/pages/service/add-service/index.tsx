import {
  Dialog,
  DialogContent,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Select,
  DialogActions,
  FormControl,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AddButton from '../../../components/add-button';
import DialogTitle from '../../../components/dialog-title';
import ApiService from '../../../services/api-service';
import { generateErrorMessage } from '../../../utils/generate-error-message';

export interface AddServiceProps {
  onClose(): void;
  isOpen: boolean;
}

const AddService = ({ isOpen, onClose }: AddServiceProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [defaultTimeInMinutes, setDefaultTimeInMinutes] = useState('120');
  const [typeOfService, setTypeOfService] = useState<'addon' | 'main'>('main');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);

  useEffect(() => {
    setSubmitIsDisabled(
      !name ||
        !description ||
        (!defaultTimeInMinutes && typeOfService === 'addon') ||
        isLoading
    );
  });

  const resetStates = () => {
    setName('');
    setDescription('');
    setDefaultTimeInMinutes('30');
    setSubmitIsDisabled(true);
    setIsLoading(false);
    setErrorMessage('');
  };

  const close = () => {
    resetStates();
    onClose();
  };

  const submit = async () => {
    setIsLoading(true);
    setErrorMessage('');
    const params = { name, description, defaultTimeInMinutes };
    try {
      if (typeOfService === 'main') await ApiService.addBookingType(params);
      else await ApiService.addAddonService(params);
      setIsLoading(false);
      close();
    } catch (e) {
      setErrorMessage(generateErrorMessage(e));
      setIsLoading(false);
    }
  };

  const handleServiceTypeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => setTypeOfService(event.target.value as 'main' | 'addon');

  if (!isOpen) return null;
  return (
    <>
      <Dialog open={isOpen}>
        <DialogTitle onClose={close}>Add new service</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography>Type of service</Typography>
              <FormControl variant="outlined" size="small" fullWidth>
                <Select
                  autoFocus
                  id="select-service-type"
                  value={typeOfService}
                  onChange={handleServiceTypeChange}
                  required
                >
                  <MenuItem value="main">Main service</MenuItem>
                  <MenuItem value="addon">Addon service</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                required
                variant="outlined"
                id="name"
                data-test="name"
                name="name"
                label="Title"
                fullWidth
                autoComplete="false"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                required
                variant="outlined"
                id="description"
                name="description"
                data-test="description"
                label="Description of the service"
                fullWidth
                autoComplete="false"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            {typeOfService === 'addon' ? (
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  variant="outlined"
                  type="number"
                  id="defaultTimeInMinutes"
                  data-test="defaultTimeInMinutes"
                  name="defaultTimeInMinutes"
                  label="Default time in minutes"
                  fullWidth
                  autoComplete="false"
                  value={defaultTimeInMinutes}
                  onChange={(e) => setDefaultTimeInMinutes(e.target.value)}
                  onFocus={(e) => e.target.select()}
                  error={Number(defaultTimeInMinutes) <= 0}
                  helperText="The default time must be greater than zero"
                />
              </Grid>
            ) : null}

            <Grid item xs={12}>
              {errorMessage ? (
                <Typography
                  color="error"
                  style={{ textAlign: 'center' }}
                  data-test="ERROR_MESSAGE"
                >
                  {errorMessage}
                </Typography>
              ) : null}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <AddButton
            disabled={submitIsDisabled}
            data-test="ADD_SERVICE_SUBMIT"
            onClick={submit}
          >
            Add service
          </AddButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddService;
