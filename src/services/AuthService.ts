/* eslint-disable @typescript-eslint/camelcase */
import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import UsersRepository from '../repositories/UsersRepository';
import User from '../models/User';
import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

interface AuthUser {
  username: string;
  email: string;
  token: string;
}

class AuthService {
  private createJWT(user: User): string {
    return sign(
      {
        permission: 'admin',
      },
      authConfig.jtw.secret,
      {
        subject: user.id,
        expiresIn: authConfig.jtw.expiresIn,
      }
    );
  }

  async authUser({ email, password }: Request): Promise<AuthUser> {
    const userRepository = getCustomRepository(UsersRepository);
    const user = await userRepository.findOne({
      where: [{ email }],
    });

    if (!user) {
      throw new Error('Incorrect email/password');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password');
    }

    const token = this.createJWT(user);

    return {
      username: user.username,
      email: user.email,
      token,
    };
  }
}

export default AuthService;
