import apiService from '../../services/api-service';
import { creditCardActions } from '.';
import * as Sentry from '@sentry/react-native';
import store from '../';

export async function loadCreditCardsToStore (): Promise<void> {
  try {
    const cards = await apiService.getAllCreditCards();
    store.dispatch(creditCardActions.setCards(cards));
  } catch (e) {
    Sentry.captureException(e);
    console.log(e);
    throw e;
  }
}
