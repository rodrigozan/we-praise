
// import { Types } from 'mongoose'
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { IUser } from 'interfaces/global.interface';

import { UserModel } from '../models/UserModel';

const JWT_SECRET = process.env.JWT_SECRET as Secret;

export class AuthService {  

  static async findUserByEmail(email: string): Promise<IUser  | null> {
    try {    

      return await UserModel.findOne({ email: email }, `id email password role`);
      
    } catch (error) {
      throw new Error(`User not found in AuthService: ${error}`);
    }
  }

  static async validatePassword(email: string, password: string): Promise<boolean> {
    try {
      const user = await this.findUserByEmail(email);      

      if (!user) {
        throw new Error('User not found in  in AuthService');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)
      return isPasswordValid;

    } catch (error) {
      throw new Error(`Validate password error in AuthService: ${error}`);
    } 
  }

  static generateToken(user: IUser): string {
    try {
      return jwt.sign({ id: user.id }, JWT_SECRET!, { expiresIn: '7d' });
    } catch (error) {
      throw new Error(`Token generator error: ${error}`);
    }
  }
  
}

