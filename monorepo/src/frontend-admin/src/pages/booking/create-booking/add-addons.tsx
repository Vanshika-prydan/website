import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useState } from 'react';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { AddonModel } from '../../../models/addon.model';

export interface AddAddonsProps {
  availableAddons: AddonModel[];
  selectedAddons: AddonModel[];
  // eslint-disable-next-line no-unused-vars
  onSelectAddon(addon: AddonModel): void;
  // eslint-disable-next-line no-unused-vars
  onUnselectAddon(addon: AddonModel): void;
}

const AddedAddonList = ({
  selectedAddons,
  onUnselect,
}: {
  selectedAddons: AddonModel[];
  // eslint-disable-next-line no-unused-vars
  onUnselect(addon: AddonModel): void;
}) => {
  if (selectedAddons.length === 0) return null;
  return (
    <List>
      {selectedAddons.map((addon) => (
        <ListItem key={addon.addonId}>
          <ListItemText>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>{addon.name}</Typography>
              <Button onClick={() => onUnselect(addon)}>
                {' '}
                <RemoveIcon />{' '}
              </Button>
            </div>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

const AddAddons = ({
  onSelectAddon,
  onUnselectAddon,
  selectedAddons,
  availableAddons,
}: AddAddonsProps) => {
  const [isAddingAddon, setIsAddingAddon] = useState(false);
  const [selectedAddon, setSelectedAddon] = useState<null | AddonModel>(null);

  const onAddSelect = () => {
    if (selectedAddon) onSelectAddon(selectedAddon);
    setSelectedAddon(null);
    setIsAddingAddon(false);
  };
  const onClickCancel = () => {
    setSelectedAddon(null);
    setIsAddingAddon(false);
  };
  return (
    <div>
      <Divider />
      <div style={{ marginTop: 20 }}>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection="row"
          >
            <Box>
              <Typography variant="h5">Addons</Typography>
            </Box>
            {!isAddingAddon ? (
              <Box>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => setIsAddingAddon(true)}
                >
                  <AddIcon />
                </Button>
              </Box>
            ) : null}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <AddedAddonList
            selectedAddons={selectedAddons}
            onUnselect={onUnselectAddon}
          />
          {isAddingAddon ? (
            <Box display="flex" flexDirection="row">
              <Autocomplete
                size="small"
                id="selected_booking_type"
                options={availableAddons}
                onChange={(_, selAddon) => setSelectedAddon(selAddon)}
                getOptionLabel={(option) =>
                  `${option.name} - ${option.description ?? ''} - ${
                    option.defaultTimeInMinutes
                  } minutes`
                }
                style={{ width: '100%' }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select an addon"
                    variant="outlined"
                  />
                )}
              />
              <Button variant="text" color="primary" onClick={onAddSelect}>
                <AddIcon />
              </Button>
              <Button variant="text" color="secondary" onClick={onClickCancel}>
                <RemoveIcon />
              </Button>
            </Box>
          ) : null}
        </Grid>
      </div>
    </div>
  );
};

export default AddAddons;
