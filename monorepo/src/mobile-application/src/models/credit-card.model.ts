export interface CreditCardModel {
  id: string;
  brand: string;
  expMonth: number;
  expYear: number;
  last4: string;
  isPrimary?: boolean;
}
