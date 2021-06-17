import jwt, { Algorithm } from 'jsonwebtoken';

export const generate_token = (user) => {
  return jwt.sign(
    {
      user: {
        id: user._id,
        idType: user.idType,
        idCustomer: user.idCustomer
      }
    },
    process.env.JWT_SECRET,
    {
      expiresIn: Number(process.env.EXPIRE_TIME_TOKEN),
      algorithm: process.env.JWT_ALGO as Algorithm
    }
  );
};
