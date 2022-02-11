
interface EditableFields {
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  roles?: string[];
}

export interface EditAccountRequestPayload {
  accountId: string;
  fieldsToUpdate: Partial<EditableFields>;
}
