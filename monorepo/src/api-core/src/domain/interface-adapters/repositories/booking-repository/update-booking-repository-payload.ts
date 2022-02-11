
export interface FiledsToUpdate {
    startTime: Date;
    endTime: Date;
    addressId: string;
    privateNotes: string;
    specialInstructions: string;
    employeeId: string;
    bookingTypeId: string;
}

export interface UpdateBookingRepositoryPayload {
    bookingId: string;
    filedsToUpdate: Partial<FiledsToUpdate>;
}
