import dotenv from 'dotenv';

const envFound = dotenv.config();

if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: process.env.PORT,
  databaseURL: process.env.MONGODB_URI,
  logs: {
    level: process.env.LOG_LEVEL || 'silly'
  },

  jwtSecret: process.env.JWT_SECRET,
  jwtAlgorithm: process.env.JWT_ALGO,
  expireTimeToken: process.env.EXPIRE_TIME_TOKEN,
  expireTimeTokenForgot: process.env.EXPIRE_TIME_TOKEN_FORGOT
};
