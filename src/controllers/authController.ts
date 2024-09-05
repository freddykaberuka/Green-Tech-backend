import { Request, Response } from 'express';
import { register, login } from '../services/authService';
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
      res.status(200).send({ message: 'User logged in successfully', user });
    } catch (error) {
      if (isError(error)) {
        res.status(400).send({ error: error.message });
      } else {
        res.status(400).send({ error: 'Unknown error occurred' });
      }
    }
  };
  
