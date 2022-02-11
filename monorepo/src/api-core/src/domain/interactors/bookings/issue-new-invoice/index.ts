import { inject, injectable } from 'tsyringe';
import { InvoiceRepositoryInterface, INVOICE_REPOSITORY_INTERFACE } from '../../../interface-adapters/repositories/invoice-repository';

@injectable()
export default class IssueNewInvoiceUseCase {
  constructor (@inject(INVOICE_REPOSITORY_INTERFACE) private readonly invoiceRepository: InvoiceRepositoryInterface) {}

  withStripe () {}
  withManualPayment () {}
}
