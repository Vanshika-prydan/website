import PostalCode from '@utils/postal-codes';
import config from '@src/config';

import * as yup from 'yup';
import { Address } from './types';

const validationSchema = yup.object({
  street: yup.string().min(6).required('Adressen är obligatorisk'),
  postalCode: yup
    .string()
    .required('Postkoden är obligatorisk')
    .length(5, 'Postkoden måste vara fem sifror lång')
    .test('isValidPostalCode', 'Tyvärr finns vi inte än i ditt område', (val) =>
      new PostalCode().validatePostalCode(val ?? '')
    ),
  doorCode: yup.string().optional(),
  areaInM2: yup
    .number()
    .typeError('Måste vara numeriskt')
    .min(10, 'Vi kan inte städa platser mindre än 10 m2')
    .max(
      300,
      `Vi kan maximalt handlägga bostäder upp till 300m2 i appen. Vänligen kontakta oss på ${config.PHONE_NUMBER} för större bostäder.`
    )
    .required(
      'Storleken på din bostad är obligatorisk för att vi ska kunna uppskatta städtiden'
    ),
  addressType: yup.string().oneOf(Address),
  numberOfBathRooms: yup
    .number()
    .typeError('Måste vara numeriskt')
    .min(1, 'Lägsta antalet badrum är ett')
    .max(
      10,
      'Kontakta oss då ditt hem är så stort att du behöver ett speciellt upplägg'
    )
    .required('Du måste ange hur många badrum som finns'),
});

export default validationSchema;
