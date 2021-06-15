import Category from '../models/category';
import Characteristic from '../models/characteristic';
import Ingredient from '../models/ingredient';
import Menu from '../models/menu';

export const validateCategory = async (idCategory) => {
  if (idCategory) {
    const existCategory = await Category.findByPk(idCategory);
    if (!existCategory) {
      throw new Error(`La categoria ${idCategory} no existe`);
    }
  }
};

export const validateIngredients = async (ingredients) => {
  if (ingredients) {
    await Promise.all(
      ingredients.map(async (ingredient) => {
        const existIngredient = await Ingredient.findByPk(ingredient.idIngredient);
        if (!existIngredient) {
          throw new Error(`El ingrediente ${ingredient.idIngredient} no existe`);
        }
      })
    );
  }
};

export const validateCharacteristics = async (idCharacteristics) => {
  if (idCharacteristics) {
    await Promise.all(
      idCharacteristics.map(async (idCharacteristic) => {
        const existCharacteristic = await Characteristic.findByPk(idCharacteristic);
        if (!existCharacteristic) {
          throw new Error(`La caracteristica ${idCharacteristic} no existe`);
        }
      })
    );
  }
};

export const validateGarnishes = async (garnishes) => {
  if (garnishes) {
    await Promise.all(
      garnishes.map(async (garnish) => {
        const existGarnish = await Menu.findByPk(garnish.id);
        if (!existGarnish) {
          throw new Error(`La guarnicion ${garnish.id} no existe`);
        }
        if (!existGarnish.isGarnish) {
          throw new Error(`El menu ${garnish.name} no es una guarnicion valida`);
        }
      })
    );
  }
};
