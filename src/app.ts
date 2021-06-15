import dotenv from 'dotenv';
import Server from './loaders/server';

//Cargar la configuracion de .env
dotenv.config();

// await require('./loaders').default({ expressApp: app });

const server = new Server();

server.listen();
