import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

const SessionController = {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const authService = new AuthService();
    const user = await authService.authUser({ email, password });

    return res.json(user);
  },
};

export default SessionController;
