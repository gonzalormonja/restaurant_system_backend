import { Request, Response } from 'express';
import jwt, { Algorithm } from 'jsonwebtoken';
import User from '../models/users';

//===================
// VERIFICAR TOKEN
//===================

interface IToken {
  user: typeof User;
}

const isAuth = (req, res, next) => {
  //token
  let token_string = req.get('token');
  jwt.verify(
    token_string,
    process.env.JWT_SECRET,
    { algorithms: [process.env.JWT_ALGO as Algorithm] },
    async (err, token: IToken) => {
      if (err) {
        if (err.name == 'TOKEN_EXPIRED_ERROR') {
          return res.status(401).json({
            msg: '[isAuth] Token expirado'
          });
        } else {
          return res.status(401).json({
            msg: '[isAuth] Token invalido'
          });
        }
      }
      req.user = token.user;
      req.token = token;
      next();
    }
  );
};

export default isAuth;
