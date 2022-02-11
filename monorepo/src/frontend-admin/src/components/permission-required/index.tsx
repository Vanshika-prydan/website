import React from 'react';
import { useSelector } from 'react-redux';
import Permission from '../../../../api-core/src/domain/entities/Permission';
import { RootState } from '../../store/rootReducer';

interface PermissionRequiredProps {
  permission: string;
}

const PermissionRequired: React.FunctionComponent<PermissionRequiredProps> = ({
  permission,
  children,
}) => {
  const permissions = useSelector((state: RootState) => state.auth.permissions);
  if (!permissions) return null;
  if (!permissions.includes((permission as unknown) as Permission)) {
    return null;
  }

  return <>{children}</>;
};

export default PermissionRequired;
