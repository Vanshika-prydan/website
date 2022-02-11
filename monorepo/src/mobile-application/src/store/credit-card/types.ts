import { CreditCardModel } from '../../models/credit-card.model';

export interface CreditCardState {
  creditCards: CreditCardModel[];
  isLoading: boolean;
}
