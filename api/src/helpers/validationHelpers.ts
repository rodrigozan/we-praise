import { UserService } from '../services/UserService';
import ValidationHelper from './ValidationHelper';
import { IPost, ISong, IScale, IMessage, IComment } from '../interfaces/global.interface';

function createValidationHelper<T>(): ValidationHelper<T> {
    return new ValidationHelper<T>(UserService.findUserById.bind(UserService));
}

const postValidationHelper = createValidationHelper<IPost>();
const songValidationHelper = createValidationHelper<ISong>();
const scaleValidationHelper = createValidationHelper<IScale>();
const messageValidationHelper = createValidationHelper<IMessage>();
const commentValidationHelper = createValidationHelper<IComment>();

export { postValidationHelper, songValidationHelper, scaleValidationHelper, messageValidationHelper, commentValidationHelper };
