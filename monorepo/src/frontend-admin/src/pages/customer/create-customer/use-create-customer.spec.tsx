import React from 'react';
import { act } from 'react-dom/test-utils';
import ApiServiceType from '../../../services/api-service';
import { testHook } from '../../../utils/test-hook';
import { useCreateCustomer } from './use-create-customer';

describe('Create customer logic hook', () => {
  let hook: ReturnType<typeof useCreateCustomer>;
  let onCreated: typeof jest.fn;
  let onError: typeof jest.fn;
  let ApiService: typeof ApiServiceType;
  beforeEach(() => {
    onCreated = jest.fn();
    onError = jest.fn();
    ApiService = { createCustomer: jest.fn(() => Promise.resolve({ success: true })) } as unknown as typeof ApiServiceType;
    testHook(() => { hook = useCreateCustomer({ ApiService, onCreated, onError }); });
  });

  it('The submit should be disabled from the beginning', () => {
    expect(hook.submitIsDisabled).toBeTruthy();
  });
  it('should not be disabled when all fields are ok and create the customer', async () => {
    act(() => {
      hook.setFirstName('Niklas');
      hook.setLastName('Johansson');
      hook.setEmail('niklas@cleangreen.se');
      hook.setPassword('rt45y6TRH45:r4fR_rfw');
      hook.setPhoneNumber('0704442211');
    });
    expect(hook.submitIsDisabled).toBeFalsy();

    await act(async () => {
      await hook.createCustomer();
    });
    expect(ApiService.createCustomer).toHaveBeenCalledWith({
      firstName: 'Niklas',
      lastName: 'Johansson',
      email: 'niklas@cleangreen.se',
      password: 'rt45y6TRH45:r4fR_rfw',
      phoneNumber: '0704442211'
    });
    expect(onCreated).toHaveBeenCalledWith({ success: true });
  });
  it('Should be able to create a customer without the password and phone number', async () => {
    act(() => {
      hook.setFirstName('Niklas');
      hook.setLastName('Johansson');
      hook.setEmail('niklas@cleangreen.se');
    });
    expect(hook.submitIsDisabled).toBeFalsy();
    await act(async () => {
      await hook.createCustomer();
    });
    expect(ApiService.createCustomer).toHaveBeenCalledWith({
      firstName: 'Niklas',
      lastName: 'Johansson',
      email: 'niklas@cleangreen.se',
    });
    expect(onCreated).toHaveBeenCalledWith({ success: true });
  });
});
