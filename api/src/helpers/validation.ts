import { IUser } from '../interfaces/global.interface';

class validation {
    public validatePostAuthor(user: IUser) {
        if (user.role !== 'editor') {
            throw new Error('User does not have permission to publish posts.');
        }
        return true;
    }
}

export default new validation()


