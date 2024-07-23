import { Types } from 'mongoose';
import { IUser } from '../interfaces/global.interface';

class ValidationHelper<T> {
    
    private findUserById: (id: Types.ObjectId, data: string) => Promise<IUser | null>;
    private findOne: (id: Types.ObjectId) => Promise<T | null>;

    constructor(
        findUserById: (id: Types.ObjectId, data: string) => Promise<IUser | null>,
        findOne: (id: Types.ObjectId) => Promise<T | null>
    ) {
        this.findUserById = findUserById;
        this.findOne = findOne;
    }

    public async validateEntity(id: Types.ObjectId, entity: T, text: string, roleField: string, userRegisterField: keyof T) {
        const user = await this.findUserById(id, roleField);

        if (!user) {
            throw new Error('User not found');
        }

        if (text === 'create') await this.validateEntityAuthor(user, roleField);
        if (text === 'update' || text === 'delete') await this.validateAlterEntityAuthor(entity, text, userRegisterField);
    }

    public async validateEntityAuthor(user: IUser, roleField: string) {     
        roleField = user.role       
        if (roleField === 'member') {
            throw new Error('User does not have permission.');
        }
        return true;
    }

    public async validateAlterEntityAuthor(entity: T, text: string, userRegisterField: keyof T) {
        const userRegister = entity[userRegisterField] as unknown as Types.ObjectId;
        const result = await this.findOne(userRegister);

        if (!result) {
            throw new Error(`User does not have permission to ${text} this entity`);
        }

        return result;
    }
}

export default ValidationHelper;
