import Invoice, { InvoiceInterface } from '../../../entities/Invoice';

export const INVOICE_REPOSITORY_INTERFACE = 'InvoiceRepositoryInterface';
export interface InvoiceRepositoryInterface {
    save(invoice: InvoiceInterface):Promise<Invoice>;
    fetch(invoiceId: string): Promise<Invoice | undefined>;
    fetchOrFail(invoiceId: string): Promise<Invoice>;
    fetchAll():Promise<Invoice[]>;
}
