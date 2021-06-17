import menuRoutes from '../routes/menus.routes';
import categoryRoutes from '../routes/categories.routes';
import IngredientRoute from '../routes/ingredients.routes';
import CharacteristicRoutes from '../routes/characteristics.routes';

export const route_init = (app) => {
  app.use('/menus', menuRoutes);
  app.use('/categories', categoryRoutes);
  app.use('/ingredients', IngredientRoute);
  app.use('/characteristics', CharacteristicRoutes);
};
