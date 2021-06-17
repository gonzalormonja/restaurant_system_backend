import express, { Application } from 'express';
import menuRoutes from '../routes/menus.routes';
import categoryRoutes from '../routes/categories.routes';
import IngredientRoute from '../routes/ingredients.routes';
import CharacteristicRoutes from '../routes/characteristics.routes';

import cors from 'cors';
import db from '../db/connection';
import { route_init } from '../routes';

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';

    this.dbConnection();
    this.middlewares();
    route_init(this.app);
  }

  dbConnection = async () => {
    try {
      await db.authenticate();
      console.log('Database online');
    } catch (error) {
      console.log(error);
      throw new Error('Error al conectar la base de datos');
    }
  };

  middlewares = () => {
    //CORS
    this.app.use(cors());

    //Lecuta del body
    this.app.use(express.json());

    //Carpeta publica(fotos), la carpeta se llama public
    // this.app.use(express.static('public'));
  };

  listen = () => {
    this.app.listen(this.port, () => {
      console.log(`
        ################################################
        🛡️  Server listening on port: ${this.port} 🛡️
        ################################################
      `);
    });
  };
}

export default Server;
