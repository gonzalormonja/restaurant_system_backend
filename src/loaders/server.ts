import express, { Application } from 'express';
import menuRoutes from '../app/routes/menus.routes';
import categoryRoutes from '../app/routes/categories.routes';
import IngredientRoute from '../app/routes/ingredients.routes';
import CharacteristicRoutes from '../app/routes/characteristics.routes';

import cors from 'cors';
import db from '../db/connection';

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    menus: '/menus',
    categories: '/categories',
    ingredients: '/ingredients',
    characteristics: '/characteristics'
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';

    this.dbConnection();
    this.middlewares();
    this.routes();
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

  routes = () => {
    this.app.use(this.apiPaths.menus, menuRoutes);
    this.app.use(this.apiPaths.categories, categoryRoutes);
    this.app.use(this.apiPaths.ingredients, IngredientRoute);
    this.app.use(this.apiPaths.characteristics, CharacteristicRoutes);
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
