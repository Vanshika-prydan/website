
type IRequestParams <Request> = {
    payload?:Request,
    idOfExecutingAccount?: string,
}

interface IUseCase<Request = {}, Response = {}> {
    execute({ payload, idOfExecutingAccount }:IRequestParams<Request>):Promise<Response>;
}

export default IUseCase;
