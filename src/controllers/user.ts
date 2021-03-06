/* eslint-disable @typescript-eslint/camelcase */
import { Request, Response } from 'express';
import UserService from '../services/UserService';
import User from '../models/User';

const UserController = {
  async index(req: Request, res: Response): Promise<User | Response> {
    const userService = new UserService();
    const users = await userService.getAllUsers();
    return res.json({ users });
  },
  async create(req: Request, res: Response): Promise<User | Response> {
    const { username, email, password } = req.body;
    const userService = new UserService();
    const newUser = await userService.createUser({
      username,
      email,
      password,
    });
    return res.json(newUser);
  },
};

export default UserController;
