export interface ErrorModel {
    error: string,
    errorCode: string,
    message?: string,
    badParameters?: string[]
}

export class ErrorDTO implements ErrorModel {
    public readonly error: string;
    public readonly errorCode: string;
    public readonly message?: string ;
    public readonly badParameters?: string[];

    constructor (error:Error, errorCode?: string, params?:{message?: string, badParameters?: string[]}) {
      this.error = error.name;
      this.errorCode = error.message;
      this.message = params?.message;
      this.badParameters = params?.badParameters;
    }
}
