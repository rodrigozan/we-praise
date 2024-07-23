import { Types } from 'mongoose';

import { IUser, IScale } from '../interfaces/global.interface';

import { UserService } from '../services/UserService';
class ValidationScaleHelper {
    public async validateUser(id: Types.ObjectId, scale: IScale, text: string) {
        const userId = id

        const user = await UserService.findUserById(userId, 'role');

        if (!user) {
            throw new Error('User not found');
        }

        if(text === 'create') this.validateScaleAuthor(user)
        if(text === 'update' || text === 'delete') this.validateAlterScaleAuthor(scale, text)
    }
    public async validateScaleAuthor(user: IUser) {            
        if (user.role === 'member') {
            throw new Error('User does not have permission to publish posts.');
        }
        return true;
    }
    public async validateAlterScaleAuthor(scale: IScale, text: string) {
        const author = scale.author
        const result = UserService.findOne(author)
        if (result) {
            return await result;
        } else {
            throw new Error(`User does not have permission to ${text} this post`);
        }

    }
}

export default new ValidationScaleHelper()


