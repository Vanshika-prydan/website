import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React from 'react';
import { AddonModel } from '../../../models/addon.model';

export interface AddonListProps {
  addons: AddonModel[];
}

const AddonList = ({ addons }: AddonListProps) => (
  <TableContainer>
    <Table stickyHeader size="small">
      <TableHead>
        <TableRow>
          <TableCell>Service</TableCell>
          <TableCell>Description</TableCell>
          <TableCell align="right">Duration</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {addons.map((a) => (
          <TableRow key={a.addonId} hover>
            <TableCell>{a.name}</TableCell>
            <TableCell>{a.description}</TableCell>
            <TableCell align="right">
              {a.defaultTimeInMinutes} minutes
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default AddonList;
