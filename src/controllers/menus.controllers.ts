import { Request, Response } from 'express';
import Category from '../models/category';
import Characteristic from '../models/characteristic';
import Ingredient from '../models/ingredient';
import Menu from '../models/menu';
import MenuCharacteristic from '../models/menuCharacteristic';
import MenuGarnish from '../models/menuGarnish';
import MenuIngredient from '../models/menuIngredient';
import Price from '../models/price';

export const getMenus = async (req: Request, res: Response) => {
  let { search, start, limit, columnOrder, order, idCategories } = req.query;

  const pipeline: any[] = [];

  if (search) {
    const searchQuery = { $iLike: `%${search}%` };
    pipeline.push({
      $or: [{ name: searchQuery }, { short_name: searchQuery }, { bar_code: searchQuery }]
    });
  }
  if (idCategories) {
    pipeline.push({
      idcategory: { $in: [idCategories] }
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
    order = 'DESC';
  }
  pipeline.push({
    order: [[columnOrder, order]]
  });
  pipeline.push({
    include: [
      { model: Category },
      { model: Price },
      { model: Menu, as: 'garnishes' },
      { model: Menu, as: 'menusOfGarnish' },
      { model: Characteristic },
      { model: Ingredient }
    ]
  });
  console.log(pipeline.reduce((acc, el) => ({ ...acc, ...el }), {}));
  const menus = await Menu.findAll(pipeline.reduce((acc, el) => ({ ...acc, ...el }), {}));

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
        MenuGarnish.create({
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

    //* update ingredients
    if (body.ingredients) {
      //* delete previous ingredients
      MenuIngredient.destroy({
        where: {
          idMenu: id
        }
      });
      //*add ingredients
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
    }

    //* update characteristics
    if (body.idCharacteristics) {
      //* delete previous characteristics
      MenuCharacteristic.destroy({
        where: {
          idMenu: id
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
    }

    //* update granishes
    if (body.granishes) {
      //* delete previous granishes
      MenuGarnish.destroy({
        where: {
          idMenu: id
        }
      });

      //* add garnishes
      body.garnishes?.map(async (garnish) => {
        const garnishRecord = await Menu.findByPk(garnish.id);
        if (garnishRecord) {
          if (!garnishRecord.isGarnish) {
            throw new Error(`El menu ${garnishRecord.name} no es una guarnicion valida`);
          }
          MenuGarnish.create({
            idGarnish: garnishRecord.id,
            idMenu: menu.id,
            max_quantity: garnish.max_quantity
          });
        }
      });
    }

    //* add price
    await Price.create({ price: body.price ? body.price : 0, idMenu: menu.id });

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
