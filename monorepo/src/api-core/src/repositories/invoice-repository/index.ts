import { injectable } from 'tsyringe';
import { getRepository } from 'typeorm';
import Invoice, { InvoiceInterface, InvoiceWithoutId } from '../../domain/entities/Invoice';
import InvoiceService from '../../domain/services/invoice-service';
import { InvoiceRepositoryInterface } from '../../domain/interface-adapters/repositories/invoice-repository';

@injectable()
export default class InvoiceRepository implements InvoiceRepositoryInterface {
  async save (invoice: InvoiceWithoutId | InvoiceInterface): Promise<Invoice> {
    const inv = new Invoice(invoice);
    const savedInvoice = await getRepository(Invoice).save(inv);
    if (!InvoiceService.isInvoiceWithId(savedInvoice)) throw new Error('No id');
    return savedInvoice;
  }

  fetch (invoiceId: string): Promise<Invoice | undefined> {
    return getRepository(Invoice).findOne(invoiceId);
  }

  fetchOrFail (invoiceId: string): Promise<Invoice> {
    return getRepository(Invoice).findOneOrFail(invoiceId);
  }

  fetchAll (): Promise<Invoice[]> {
    return getRepository(Invoice).find();
  }
}
