import { Types } from 'mongoose';

import { IPost, IUser } from '../interfaces/global.interface';

import { UserService } from '../services/UserService';
class ValidationPostHelper {
    public async validateUser(id: Types.ObjectId, post: IPost, text: string) {
        const userId = id

        const user = await UserService.findUserById(userId, 'role');

        if (!user) {
            throw new Error('User not found');
        }

        if(text === 'create') this.validatePostAuthor(user)
        if(text === 'update' || text === 'delete') this.validateAlterPostAuthor(post, text)
    }
    public async validatePostAuthor(user: IUser) {            
        if (user.role === 'member') {
            throw new Error('User does not have permission to publish posts.');
        }
        return true;
    }
    public async validateAlterPostAuthor(post: IPost, text: string) {
        const author = post.author
        const result = UserService.findOne(author)
        if (result) {
            return await result;
        } else {
            throw new Error(`User does not have permission to ${text} this post`);
        }

    }
}

export default new ValidationPostHelper()


