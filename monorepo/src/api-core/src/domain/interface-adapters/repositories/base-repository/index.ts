export interface BaseRepositoryInterface<T> {
    save(entity:T):Promise<T>;
    findById(id:string):Promise<T | undefined>;
    findAll():Promise<T[]>;
    delete(entity:T):Promise<void>;
}
