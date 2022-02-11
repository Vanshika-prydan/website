import { useEffect, useState } from 'react';
import { ErrorModel } from '../../models/error.model';
import { LoginResponseModel } from '../../models/login-response.model';
// import ApiService from '../../services/api-service';
import AuthenticationService from '../../services/authentication-service';

interface Setup {
  // eslint-disable-next-line no-unused-vars
  onSuccess(params: LoginResponseModel): void;
  // eslint-disable-next-line no-unused-vars
  onFailure?(error: ErrorModel): void;
  initialEmail?: string;
  initialPassword?: string;
}

const errorCodeToMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'ACCOUNT_DOES_NOT_EXIST':
      return 'The account does not exist';
    case 'WRONG_PASSWORD':
      return 'Incorrect password';
    case 'INVALID_PASSWORD':
      return 'Incorrect password';
    default:
      return 'unknown error';
  }
};

export const useLogin = ({
  onSuccess,
  onFailure,
  initialEmail,
  initialPassword,
}: Setup) => {
  const [email, setEmail] = useState(initialEmail ?? '');
  const [password, setPassword] = useState(initialPassword ?? '');
  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setSubmitIsDisabled(isLoading || !password || !email);
  });

  const login = async () => {
    try {
      setError('');
      setIsLoading(true);
      const user = await AuthenticationService.login({ email, password });
      setEmail('');
      setPassword('');
      onSuccess(user);
    } catch (e) {
      setError(errorCodeToMessage((e as ErrorModel )?.errorCode));
      if (onFailure) onFailure(e as ErrorModel);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    submitIsDisabled,
    isLoading,
    error,
    login,
  };
};

export default useLogin;
