import { Request, Response } from 'express';
import { register, login, requestPasswordReset, resetPassword } from '../services/authService';
import { Roles } from '../utils/roles';
import { generateToken } from '../utils/jwt';

function isError(error: unknown): error is Error {
    return error instanceof Error;
  }
  
  export const registerUser = async (req: Request, res: Response) => {
    const { email, password,role } = req.body;
    try {
        const userRole = role === Roles.Admin ? Roles.Admin : Roles.User;
        await register(email, password, userRole);
        const token = generateToken(email, userRole);
        res.status(201).send({ message: 'User registered successfully', token });
    } catch (error) {
      if (isError(error)) {
        res.status(400).send({ error: error.message });
      } else {
        res.status(400).send({ error: 'Unknown error occurred' });
      }
    }
  };
  export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await login(email, password);
      const token = generateToken(user.id.toString(), user.role);
  
      res.status(200).send({
        
        message: 'User logged in successfully',
        token,
      });
      console.log('user logged in');
    } catch (error) {
      if (isError(error)) {
        res.status(400).send({ error: error.message });
      } else {
        res.status(400).send({ error: 'Unknown error occurred' });
      }
    }
  };

  export const requestPasswordResetController = async (req: Request, res: Response) => {
    const { email } = req.body;
  
    try {
      await requestPasswordReset(email);
      res.status(200).send({ message: 'Password reset link has been sent to your email' });
    } catch (error) {
      if (isError(error)) {
        res.status(400).send({ error: error.message });
      } else {
        res.status(400).send({ error: 'Unknown error occurred' });
      }
    }
  };

  export const resetPasswordController = async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;
  
    try {
      await resetPassword(token, newPassword);
      res.status(200).send({ message: 'Password reset successful' });
    } catch (error) {
      if (isError(error)) {
        res.status(400).send({ error: error.message });
      } else {
        res.status(400).send({ error: 'Unknown error occurred' });
      }
    }
  };

  export const logoutUser = (req: Request, res: Response) => {
    try {
      // Invalidate token on the frontend
      res.status(200).send({ message: 'User logged out successfully' });
    } catch (error) {
      if (isError(error)) {
        res.status(400).send({ error: error.message });
      } else {
        res.status(400).send({ error: 'Unknown error occurred' });
      }
    }
  };  
  
  
