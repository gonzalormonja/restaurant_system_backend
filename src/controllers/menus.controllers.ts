import { Request, Response } from 'express';
import Category from '../models/category';
import Characteristic from '../models/characteristic';
import Ingredient from '../models/ingredient';
import Menu from '../models/menu';
import MenuCharacteristic from '../models/menuCharacteristic';
import MenuGarnishModel from '../models/menuGarnish';
import MenuIngredient from '../models/menuIngredient';
import Price from '../models/price';

export const getMenus = async (req: Request, res: Response) => {
  const menus = await Menu.findAll({
    include: [
      { model: Category },
      { model: Price },
      { model: Menu, as: 'garnishes' },
      { model: Menu, as: 'menusOfGarnish' },
      { model: Characteristic },
      { model: Ingredient }
    ]
  });

  res.json(menus);
};

export const postMenu = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const menu = await Menu.create(body);
    //* add ingredients
    body.ingredients?.map(async (ingredient) => {
      const ingredientRecord = await Ingredient.findByPk(ingredient.id);
      if (ingredientRecord) {
        MenuIngredient.create({
          idIngredient: ingredientRecord.id,
          idMenu: menu.id,
          quantity: ingredient.quantity
        });
      }
    });

    //* add characteristics
    body.idCharacteristics?.map(async (idCharacteristic) => {
      const characteristicRecord = await Characteristic.findByPk(idCharacteristic);
      if (characteristicRecord) {
        MenuCharacteristic.create({
          idCharacteristic: characteristicRecord.id,
          idMenu: menu.id
        });
      }
    });

    //* add garnishes
    body.garnishes?.map(async (garnish) => {
      const garnishRecord = await Menu.findByPk(garnish.id);
      if (garnishRecord) {
        if (!garnishRecord.isGarnish) {
          throw new Error(`El menu ${garnishRecord.name} no es una guarnicion valida`);
        }
        MenuGarnishModel.create({
          idGarnish: garnishRecord.id,
          idMenu: menu.id,
          max_quantity: garnish.max_quantity
        });
      }
    });

    //* add price
    await Price.create({ price: body.price ? body.price : 0, idMenu: menu.id });

    res.json(menu);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[postMenu] Error al crear un menu'
    });
  }
};

export const getMenu = async (req: Request, res: Response) => {
  const { id } = req.params;
  const menu = await Menu.findByPk(id);

  if (!menu) {
    return res.status(404).json({
      msg: `No existe un menu con el id ${id}`
    });
  }

  res.json(menu);
};

export const putMenu = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const menu = await Menu.findByPk(id);
    if (!menu) {
      return res.status(404).json({
        msg: `No existe un menu con el id ${id}`
      });
    }

    await menu.update(body);
    res.json(menu);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[putMenu] Error al actualizar un menu'
    });
  }
};

export const deleteMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findByPk(id);
    if (!menu) {
      return res.status(404).json({
        msg: `No existe un menu con el id ${id}`
      });
    }

    await menu.update({ state: false });
    return res.json(menu);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[deleteMenu] Error al eliminar un menu'
    });
  }
};

export const findMenuByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const menus = await Menu.findAll({
      where: {
        $or: [{ $like: { name: name } }, { $like: { short_name: name } }]
      }
    });

    res.json(menus);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[findMenuByName] Error al buscar un menu'
    });
  }
};
