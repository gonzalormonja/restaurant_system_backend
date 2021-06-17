import menuRoutes from './menus.routes';
import categoryRoutes from './categories.routes';
import IngredientRoute from './ingredients.routes';
import CharacteristicRoutes from './characteristics.routes';
import UserRoutes from './users.routes';

export const route_init = (app) => {
  app.use('/menus', menuRoutes);
  app.use('/categories', categoryRoutes);
  app.use('/ingredients', IngredientRoute);
  app.use('/characteristics', CharacteristicRoutes);
  app.use('/users', UserRoutes);
};
