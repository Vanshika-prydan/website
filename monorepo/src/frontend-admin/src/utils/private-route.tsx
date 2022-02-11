import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import Permission from '../../../api-core/src/domain/entities/Permission';
import PrivatePageSetup from '../components/private-page-setup';
import { RootState } from '../store/rootReducer';

type Props = { permission?: string } & RouteProps;

const PrivateRoute: FunctionComponent<Props> = ({
  children,
  permission,
  ...rest
}) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth);
  const permissions = useSelector((state: RootState) => state.auth.permissions);

  if (isAuthenticated) {
    return (
      <Route {...rest}>
        <PrivatePageSetup>
          {permission &&
          !permissions?.includes((permission as unknown) as Permission)
            ? undefined
            : children}
        </PrivatePageSetup>
      </Route>
    );
  }
  return <Redirect to="/login" />;
};

export default PrivateRoute;
