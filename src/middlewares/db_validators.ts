import Category from '../models/category';
import Characteristic from '../models/characteristic';
import Ingredient from '../models/ingredient';

export const validateCategory = async (idCategory) => {
  const existCategory = await Category.findByPk(idCategory);
  if (!existCategory) {
    throw new Error(`La categoria ${idCategory} no existe`);
  }
};

export const validateIngredients = async (idIngredients) => {
  await Promise.all(
    idIngredients.map(async (idIngredient) => {
      const existIngredient = await Ingredient.findByPk(idIngredient);
      if (!existIngredient) {
        throw new Error(`El ingrediente ${idIngredient} no existe`);
      }
    })
  );
};

export const validateCharacteristics = async (idCharacteristics) => {
  await Promise.all(
    idCharacteristics.map(async (idCharacteristic) => {
      const existCharacteristic = await Characteristic.findByPk(idCharacteristic);
      if (!existCharacteristic) {
        throw new Error(`La caracteristica ${idCharacteristic} no existe`);
      }
    })
  );
};
