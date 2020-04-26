import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

const SessionController = {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const authService = new AuthService();
      const user = await authService.authUser({ email, password });

      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};

export default SessionController;
