import { Response, Request } from 'express';
import User from '../models/users';
import bcrypt from 'bcrypt';
import { generate_token } from '../helpers/generate-token';
import Type from '../models/types';

export const signIn = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        username: username
      },
      include: [Type]
    });
    if (!user) {
      res.status(404).json({
        msg: '[SignIn] usuario no encontrado'
      });
    } else {
      if (!bcrypt.compareSync(password, user.password)) {
        res.status(404).json({
          msg: '[SignIn] usuario no encontrado'
        });
      }
      const token = generate_token(user);
      user.password = null;
      res.json({
        token: token,
        expires_in: process.env.EXPIRE_TIME_TOKEN,
        user: user
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[SignIn] Error al iniciar sesion'
    });
  }
};
