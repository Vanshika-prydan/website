import ICustomerRepository, { CUSTOMER_REPOSITORY_INTERFACE } from '../../../interface-adapters/repositories/customer-repository';
import { ICreateCustomerPayload } from './types';

import { CreateCustomerUseCase } from './create-customer';
import { ErrorCode } from '../../../entities/ErrorCode';
import { container } from 'tsyringe';
import EmailService from '../../../services/email-service';
import MockCustomer from '../../../entities/Customer/mock-customer';
import { FIRSTNAME_IS_VIOLATED } from '../../../services/account-service';
import { ServerNotificationService, SERVER_NOTIFICATION_SERVICE } from '../../../interface-adapters/gateways/server-notification-service';

describe('Create customer use case', () => {
  const createWithValues: ICreateCustomerPayload = Object.freeze({
    firstName: 'Anna',
    lastName: 'Larsson',
    email: 'anna@hej.se',
    password: 'EttSäkert:Lösenord123',
    personalIdentityNumber: '711108-7396',
    phoneNumber: '0705553322',
    receiveMarketingCommunication: true,
  });
  const createdCustomer = new MockCustomer();

  let customerRepository: ICustomerRepository;
  let serverNotificationService: ServerNotificationService;
  let emailService: EmailService;

  beforeEach(() => {
    // @ts-ignore
    customerRepository = {
      create: jest.fn(() => Promise.resolve(createdCustomer)),
      findByEmail: jest.fn(() => Promise.resolve(undefined)),
      findByPersonalIdentityNumber: jest.fn(() => Promise.resolve(undefined)),
      findByPhoneNumber: jest.fn(() => Promise.resolve(undefined)),
      update: jest.fn(() => Promise.resolve(createdCustomer)),
    };

    // @ts-ignore
    serverNotificationService = { send: jest.fn(() => Promise.resolve()) };
    // @ts-ignore
    emailService = { send: jest.fn(() => Promise.resolve()) };

    container.register(CUSTOMER_REPOSITORY_INTERFACE, { useValue: customerRepository });
    container.register(SERVER_NOTIFICATION_SERVICE, { useValue: serverNotificationService });
    container.register(EmailService, { useValue: emailService });
  });

  it('Should be possible to create a new customer', async () => {
    const createCustomer = container.resolve(CreateCustomerUseCase);
    await expect(createCustomer.execute({ payload: createWithValues })).resolves.toBe(createdCustomer);
    expect(customerRepository.create).toHaveBeenCalledWith(expect.objectContaining({
      firstName: 'Anna',
      lastName: 'Larsson',
      email: 'anna@hej.se',
      password: expect.any(String),
      personalIdentityNumber: '711108-7396',
    }));
    expect.assertions(2);
  });

  it('Should throw an error if the email already exists', async () => {
    const customerRepository = {
      findByEmail: jest.fn(() => Promise.resolve(createdCustomer)),
    } as unknown as ICustomerRepository;

    container.register(CUSTOMER_REPOSITORY_INTERFACE, { useValue: customerRepository });
    const createCustomer = container.resolve(CreateCustomerUseCase);
    await expect(createCustomer.execute({ payload: createWithValues })).rejects.toThrow(ErrorCode.EMAIL_ALREADY_EXISTS);
    expect.assertions(1);
  });

  it('Should throw if any of the fields are missing', async () => {
    const customerRepository = { } as unknown as ICustomerRepository;
    const withUnvalidInput = { ...createWithValues, firstName: '' };

    container.register(CUSTOMER_REPOSITORY_INTERFACE, { useValue: customerRepository });
    const createCustomer = container.resolve(CreateCustomerUseCase);
    await expect(createCustomer.execute({ payload: withUnvalidInput })).rejects.toThrow(FIRSTNAME_IS_VIOLATED);
  });

  it('should throw an error if an database error occurs', async () => {
    const customerRepository = {
      findByEmail: jest.fn(() => Promise.resolve(undefined)),
      create: jest.fn(() => Promise.reject(new Error())),
    } as unknown as ICustomerRepository;

    container.register(CUSTOMER_REPOSITORY_INTERFACE, { useValue: customerRepository });
    const createCustomer = container.resolve(CreateCustomerUseCase);

    await expect(createCustomer.execute({ payload: createWithValues })).rejects.toThrowError();
    expect.assertions(1);
  });

  it('Should throw an error if the personal identity number exists', async () => {
    customerRepository = {
      ...customerRepository,
      findByPersonalIdentityNumber: jest.fn(() => Promise.resolve(createdCustomer)),
    } as unknown as ICustomerRepository;

    container.register(CUSTOMER_REPOSITORY_INTERFACE, { useValue: customerRepository });
    const createCustomer = container.resolve(CreateCustomerUseCase);

    await expect(createCustomer.execute({ payload: createWithValues })).rejects.toThrow(ErrorCode.PERSONAL_IDENTITY_NUMBER_ALREADY_EXISTS);
    expect.assertions(1);
  });

  it('Should throw an error if the personal identity number is undefined', async () => {
    const createCustomer = container.resolve(CreateCustomerUseCase);
    // @ts-ignore
    await expect(createCustomer.execute({ payload: { ...createWithValues, personalIdentityNumber: undefined } })).rejects.toThrow(ErrorCode.MISSING_PERSONAL_IDENTITY_NUMBER);
    expect.assertions(1);
  });

  it('Should throw an error if the phone number exists on the database', async () => {
    customerRepository = {
      ...customerRepository,
      findByPhoneNumber: jest.fn(() => Promise.resolve(createdCustomer)),
    } as unknown as ICustomerRepository;

    container.register(CUSTOMER_REPOSITORY_INTERFACE, { useValue: customerRepository });
    const createCustomer = container.resolve(CreateCustomerUseCase);

    await expect(createCustomer.execute({ payload: createWithValues })).rejects.toThrow(ErrorCode.PHONE_NUMBER_ALREADY_EXISTS);
  });
});
