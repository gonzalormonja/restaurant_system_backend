import { Response, Request } from 'express';
import User from '../models/users';
import bcrypt from 'bcrypt';
import { generate_token } from '../helpers/generate-token';

export const signIn = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        username: username
      }
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
    }
    const token = generate_token(user);
    res.json(token);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[getCharacteristics] Error al crear una caracteristica'
    });
  }
};
