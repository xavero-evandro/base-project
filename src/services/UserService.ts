import { uuid } from 'uuidv4';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';
import User from '../models/User';
import AppError from '../errors/AppError';

interface NewUser {
  username: string;
  email: string;
  password: string;
}

class UserService {
  async getAllUsers(): Promise<User[]> {
    const userRepository = getCustomRepository(UsersRepository);
    return userRepository.find({
      select: ['username', 'email', 'created_at', 'updated_at'],
      cache: true,
    });
  }

  async createUser({ username, email, password }: NewUser): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);
    const findUser = await userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (findUser) throw new AppError('Username/Email already exist.');

    const hashedPassword = await hash(password, 8);
    const newUser = userRepository.create({
      id: uuid(),
      email,
      username,
      password: hashedPassword,
    });

    await userRepository.save(newUser);
    delete newUser.password;
    return newUser;
  }
}

export default UserService;
