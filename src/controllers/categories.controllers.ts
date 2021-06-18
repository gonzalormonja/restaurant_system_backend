import { Request, Response } from 'express';
import Category from '../models/category';
import Menu from '../models/menu';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll({
      where: { idCustomer: req['user'].idCustomer },
      include: [{ model: Category }, { model: Menu }]
    });
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[getCategories] Error al crear una categoria'
    });
  }
};

export const postCategory = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const category = await Category.create({ ...body, idCustomer: req['user'].idCustomer });
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[postCategory] Error al crear una categoria'
    });
  }
};

export const getCategory = (req: Request, res: Response) => {
  const { id } = req.params;

  const category = Category.findOne({
    where: {
      $and: [
        { id: id },
        {
          idCustomer: req['user'].idCustomer
        }
      ]
    }
  });

  if (!category) {
    return res.status(404).json({
      msg: `No existe una categoria con el id ${id}`
    });
  }

  res.json(category);
};

export const putCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const category = await Category.findOne({
      where: {
        $and: [
          { id: id },
          {
            idCustomer: req['user'].idCustomer
          }
        ]
      }
    });
    if (!category) {
      return res.status(404).json({
        msg: `No existe una categoria con el id ${id}`
      });
    }

    await category.update(body);
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[putCategory] Error al actualizar un menu'
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({
      where: {
        $and: [
          { id: id },
          {
            idCustomer: req['user'].idCustomer
          }
        ]
      }
    });
    if (!category) {
      return res.status(404).json({
        msg: `No existe una categoria con el id ${id}`
      });
    }

    await category.update({ state: false });
    return res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[deleteCategory] Error al eliminar una categoria'
    });
  }
};
