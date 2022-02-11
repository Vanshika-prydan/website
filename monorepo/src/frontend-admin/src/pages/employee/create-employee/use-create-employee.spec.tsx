import React from 'react';
import { act } from 'react-dom/test-utils';
import ApiServiceType from '../../../services/api-service';
import { testHook } from '../../../utils/test-hook';
import { useCreateEmployee } from './use-create-employee';

describe('Create employee logic hook', () => {
  let hook: ReturnType<typeof useCreateEmployee>;
  let onCreated: typeof jest.fn;
  let onError: typeof jest.fn;
  let ApiService: typeof ApiServiceType;
  beforeEach(() => {
    onCreated = jest.fn();
    onError = jest.fn();
    ApiService = { createEmployee: jest.fn(() => Promise.resolve({ success: true })) } as unknown as typeof ApiServiceType;
    testHook(() => { hook = useCreateEmployee({ ApiService, onCreated, onError }); });
  });

  it('The submit should be disabled from the beginning', () => {
    expect(hook.submitIsDisabled).toBeTruthy();
  });
  it('should not be disabled when all fields are ok and create the employee', async () => {
    act(() => {
      hook.setFirstName('Niklas');
      hook.setLastName('Johansson');
      hook.setEmail('niklas@cleangreen.se');
      hook.setPassword('rt45y6TRH45:r4fR_rfw');
      hook.setPhoneNumber('0704442211');
    });
    expect(hook.submitIsDisabled).toBeFalsy();

    await act(async () => {
      await hook.createEmployee();
    });
    expect(onCreated).toHaveBeenCalledWith({ success: true });
  });
});
