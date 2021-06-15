import { Request, Response } from 'express';
import Category from '../models/category';
import Characteristic from '../models/characteristic';
import Ingredient from '../models/ingredient';
import Menu from '../models/menu';
import Price from '../models/price';
export const getMenus = async (req: Request, res: Response) => {
  const menus = await Menu.findAll({
    include: [
      { model: Category },
      { model: Price },
      { model: Menu, as: 'garnishes' },
      { model: Menu, as: 'menusOfGranish' },
      { model: Characteristic },
      { model: Ingredient }
    ]
  });

  res.json(menus);
};

export const postMenu = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const menu = Menu.build(body);
    await menu.save();

    res.json(menu);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[postMenu] Error al crear un menu'
    });
  }
};

export const getMenu = (req: Request, res: Response) => {
  const { id } = req.params;

  const menu = Menu.findByPk(id);

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
