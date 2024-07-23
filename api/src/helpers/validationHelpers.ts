import { UserService } from '../services/UserService';
import ValidationHelper from './ValidationHelper';
import { IPost, ISong, IScale } from '../interfaces/global.interface';

const postValidationHelper = new ValidationHelper<IPost>(
    UserService.findUserById.bind(UserService),  // Vinculando o contexto correto
    UserService.findOne.bind(UserService)
);

const songValidationHelper = new ValidationHelper<ISong>(
    UserService.findUserById.bind(UserService),  // Vinculando o contexto correto
    UserService.findOne.bind(UserService)
);

const scaleValidationHelper = new ValidationHelper<IScale>(
    UserService.findUserById.bind(UserService),  // Vinculando o contexto correto
    UserService.findOne.bind(UserService)
);

export { postValidationHelper, songValidationHelper, scaleValidationHelper };
