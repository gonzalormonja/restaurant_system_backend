import { Request, Response } from 'express';
import Ingredient from '../models/ingredient';

export const getIngredients = async (req: Request, res: Response) => {
  try {
    const ingredients = await Ingredient.findAll();
    res.json(ingredients);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[getingredients] Error al crear una ingrediente'
    });
  }
};

export const postIngredient = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const category = Ingredient.build(body);
    await category.save();
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[postIngredient] Error al crear una ingrediente'
    });
  }
};

export const getIngredient = (req: Request, res: Response) => {
  const { id } = req.params;

  const category = Ingredient.findByPk(id);

  if (!category) {
    return res.status(404).json({
      msg: `No existe una ingrediente con el id ${id}`
    });
  }

  res.json(category);
};

export const putIngredient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const category = await Ingredient.findByPk(id);
    if (!category) {
      return res.status(404).json({
        msg: `No existe una ingrediente con el id ${id}`
      });
    }

    await category.update(body);
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[putIngredient] Error al actualizar un menu'
    });
  }
};

export const deleteIngredient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Ingredient.findByPk(id);
    if (!category) {
      return res.status(404).json({
        msg: `No existe una ingrediente con el id ${id}`
      });
    }

    await category.update({ state: false });
    return res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[deleteIngredient] Error al eliminar una ingrediente'
    });
  }
};
