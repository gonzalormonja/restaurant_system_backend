import dotenv from 'dotenv';
import Server from './loaders/server';

//Cargar la configuracion de .env
dotenv.config();

const server = new Server();

server.listen();
