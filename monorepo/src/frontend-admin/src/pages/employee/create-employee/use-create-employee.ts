import { useEffect, useState } from 'react';
import validator from 'validator';
import { EmployeeModel } from '../../../models/employee.model';
import { ErrorModel } from '../../../models/error.model';
// import { RoleModel } from '../../../models/role.model';
import ApiServiceType from '../../../services/api-service/api-service';
import { CreateEmployeeRequestPayload } from '../../../services/api-service/types';
import { generateErrorMessage } from '../../../utils/generate-error-message';

interface Setup {
  // eslint-disable-next-line no-unused-vars
  onCreated(employee: EmployeeModel): void;
  // eslint-disable-next-line no-unused-vars
  onError?(error: ErrorModel): void;
  ApiService: typeof ApiServiceType;
}

export const useCreateEmployee = ({
  ApiService,
  onCreated,
  onError,
}: Setup) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  // const [roles, setRoles] = useState<RoleModel[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () =>
    firstName && lastName && password && validator.isEmail(email);

  useEffect(() => {
    setSubmitIsDisabled(!validate() || isLoading);
  });

  const createEmployee = async () => {
    setErrorMessage('');
    setIsLoading(true);
    try {
      const payload: CreateEmployeeRequestPayload = {
        firstName,
        lastName,
        email,
        password,
        phoneNumber: phoneNumber || undefined,
        // roleNames: roles.map(r => r.name)
      };

      const employee = await ApiService.createEmployee(payload);
      resetState();
      onCreated(employee);
    } catch (e) {
      if (onError) onError(e as ErrorModel);
      setErrorMessage(generateErrorMessage(e));
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = (): void => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setPhoneNumber('');
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    phoneNumber,
    setPhoneNumber,
    isLoading,
    createEmployee,
    submitIsDisabled,
    errorMessage,
    /* roles,
    setRoles */
  };
};
export default useCreateEmployee;
