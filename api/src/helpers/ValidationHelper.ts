import { Types } from 'mongoose';
import { IUser } from '../interfaces/global.interface';

class ValidationHelper<T> {
    
    private findUserById: (id: Types.ObjectId, data: string) => Promise<IUser | null>;

    constructor(
        findUserById: (id: Types.ObjectId, data: string) => Promise<IUser | null>
    ) {
        this.findUserById = findUserById;        
    }

    public async validateEntity(id: Types.ObjectId, entity: T, text: string, roleField: string, userRegisterField: keyof T) {
        const user = await this.findUserById(id, roleField);        

        if (!user) {
            throw new Error('User not found');
        }
        

        if (text === 'create') await this.validateEntityAuthor(user, roleField);        
        if (text === 'update') await this.validateAlterEntityAuthor(entity, text, userRegisterField);
        if (text === 'delete') await this.validateDeleteEntityAuthor(user, roleField);
    }

    public async validateEntityAuthor(user: IUser, roleField: string) {     
        roleField = user.role       
        if (roleField === 'member') {
            throw new Error('User does not have permission.');
        }
        return true;
    }

    public async validateDeleteEntityAuthor(user: IUser, roleField: string) {     
        roleField = user.role       
        if (roleField === 'admin') {
            return true;            
        }
        throw new Error('User does not have permission.');
    }

    public async validateAlterEntityAuthor(entity: T, text: string, userRegisterField: keyof T) {
        console.log('entity', entity);
        
        const userRegister = new Types.ObjectId(this.getEntityUserRegister(entity, userRegisterField));
        const entityAuthor = this.getEntityAuthor(entity);  
        
    
        if (!this.isAuthorValid(userRegister, entityAuthor)) {
            throw new Error(`User does not have permission to ${text} this entity`);
        }
    }
    
    private getEntityUserRegister(entity: T, userRegisterField: keyof T): Types.ObjectId {
        return entity[userRegisterField] as unknown as Types.ObjectId;
    }
    
    private getEntityAuthor(entity: T): Types.ObjectId {
        return new Types.ObjectId((entity as any)['author'] as string);
    }
    
    private isAuthorValid(userRegister: Types.ObjectId, entityAuthor: Types.ObjectId): boolean {

        if (!(userRegister instanceof Types.ObjectId) || !(entityAuthor instanceof Types.ObjectId)) {
            throw new Error('Invalid ObjectId');
        }
        
        return userRegister.equals(entityAuthor);
    }
    
    
    
}

export default ValidationHelper;
