import { IUser } from '../interfaces/global.interface';

class ValidationHelper {
    public validatePostAuthor(user: IUser) {
        if (user.role === 'user') {
            throw new Error('User does not have permission to publish posts.');
        }
        return true;
    }
}

export default new ValidationHelper()


