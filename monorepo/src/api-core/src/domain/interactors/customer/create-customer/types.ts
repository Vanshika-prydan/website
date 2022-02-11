
export interface ICreateCustomerPayload {
    firstName: string,
    lastName: string,
    email: string,
    password?: string,
    phoneNumber?: string,
    personalIdentityNumber: string;
    receiveMarketingCommunication?: boolean;
    stripeId?: string;
}
