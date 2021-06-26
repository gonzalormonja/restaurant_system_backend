import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Ingredient from '../models/ingredient';
import { changeTimezoneObject } from '../utils/datetime-functions';

export const getIngredients = async (req: Request, res: Response) => {
  try {
    let { search, start, limit, columnOrder, order } = req.query;

    const pipeline: any[] = [];

    if (search) {
      const searchQuery = { [Op.like]: `%${search}%` };
      pipeline.push({
        [Op.and]: [{ name: searchQuery }, { idCustomer: req['user'].idCustomer }]
      });
    }
    if (start) {
      pipeline.push({
        offset: start
      });
    }
    if (limit) {
      pipeline.push({
        limit: Number(limit)
      });
    }
    if (!columnOrder) {
      columnOrder = 'id';
    }
    if (!order) {
      order = 'desc';
    }
    pipeline.push({
      order: [[columnOrder, order]]
    });
    const ingredients = await Ingredient.findAll(pipeline.reduce((acc, el) => ({ ...acc, ...el }), {}));
    res.json(ingredients.map((ingredient) => changeTimezoneObject(ingredient.toJSON(), req['tz'])));
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
    const ingredient = await Ingredient.create({ ...body, idCustomer: req['user'].idCustomer });
    res.json(changeTimezoneObject(ingredient.toJSON(), req['tz']));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[postIngredient] Error al crear una ingrediente'
    });
  }
};

export const getIngredient = async (req: Request, res: Response) => {
  const { id } = req.params;

  const ingredient = await Ingredient.findOne({
    where: {
      [Op.and]: [
        { id: id },
        {
          idCustomer: req['user'].idCustomer
        }
      ]
    }
  });

  if (!ingredient) {
    return res.status(404).json({
      msg: `No existe una ingrediente con el id ${id}`
    });
  }

  res.json(changeTimezoneObject(ingredient.toJSON(), req['tz']));
};

export const putIngredient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const ingredient = await Ingredient.findOne({
      where: {
        [Op.and]: [
          { id: id },
          {
            idCustomer: req['user'].idCustomer
          }
        ]
      }
    });
    if (!ingredient) {
      return res.status(404).json({
        msg: `No existe una ingrediente con el id ${id}`
      });
    }

    await ingredient.update(body);
    res.json(changeTimezoneObject(ingredient.toJSON(), req['tz']));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[putIngredient] Error al actualizar un product'
    });
  }
};

export const deleteIngredient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ingredient = await Ingredient.findOne({
      where: {
        [Op.and]: [
          { id: id },
          {
            idCustomer: req['user'].idCustomer
          }
        ]
      }
    });
    if (!ingredient) {
      return res.status(404).json({
        msg: `No existe una ingrediente con el id ${id}`
      });
    }

    await ingredient.update({ state: false });
    return res.json(changeTimezoneObject(ingredient.toJSON(), req['tz']));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[deleteIngredient] Error al eliminar una ingrediente'
    });
  }
};
