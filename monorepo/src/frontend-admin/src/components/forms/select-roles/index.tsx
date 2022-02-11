import { InputLabel, Select, Input, MenuItem } from '@material-ui/core';
import React, { Fragment } from 'react';
import { RoleModel } from '../../../models/role.model';

export interface SelectRolesComponentProps {
  allRoles: RoleModel[];
  // eslint-disable-next-line no-unused-vars
  onSelectedRoles(roles: RoleModel[]): void;
}

const SelectRolesComponent = ({
  allRoles: roles,
  onSelectedRoles: setSelectedRoles,
}: SelectRolesComponentProps) => {
  const [roleNamess, setRoleNames] = React.useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedRoles = event.target.value as string[];
    setRoleNames(selectedRoles);
    setSelectedRoles(
      selectedRoles.map((roleName) => {
        const role = roles.find((r) => r.name === roleName);
        if (!role) throw new Error('Role not in sync');
        return role;
      })
    );
  };

  return (
    <>
      <InputLabel id="roles-label">Roles</InputLabel>
      <Select
        fullWidth
        data-test="SELECT_ROLES"
        labelId="roles-label"
        id="select-roles"
        multiple
        value={roleNamess}
        placeholder="Click to select roles"
        onChange={handleChange}
        input={<Input />}
      >
        {roles.map((r) => (
          <MenuItem key={r.name} value={r.name}>
            {r.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default SelectRolesComponent;
