import { Request, Response } from 'express';
import Category from '../models/category';
import Product from '../models/product';
import { changeTimezoneObject } from '../utils/datetime-functions';
const { Op } = require('sequelize');

export const getCategories = async (req: Request, res: Response) => {
  try {
    let { search, pageNumber, pageSize, columnOrder, order, idCategories } = req.query as any;
    const pipeline: any[] = [];

    if (search) {
      const searchQuery = { [Op.like]: `%${search}%` };
      pipeline.push({
        where: {
          name: searchQuery
        }
      });
    }
    if (idCategories) {
      pipeline.push({
        idcategory: { [Op.in]: [idCategories] }
      });
    }
    if (pageNumber && pageSize) {
      pipeline.push(
        {
          offset: Number(pageNumber) * Number(pageSize)
        },
        {
          limit: Number(pageSize)
        }
      );
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
    pipeline.push({
      include: [{ model: Category }]
    });
    const categories = await Category.findAll(pipeline.reduce((acc, el) => ({ ...acc, ...el }), {}));
    res.json(categories.map((category) => changeTimezoneObject(category.toJSON(), req['tz'])));
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
    res.json(changeTimezoneObject(category.toJSON(), req['tz']));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[postCategory] Error al crear una categoria'
    });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await Category.findOne({
    where: {
      [Op.and]: [
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

  changeTimezoneObject(category.toJSON(), req['tz']);
};

export const putCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const category = await Category.findOne({
      where: {
        [Op.and]: [
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
    changeTimezoneObject(category.toJSON(), req['tz']);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[putCategory] Error al actualizar un product'
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({
      where: {
        [Op.and]: [
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
    return changeTimezoneObject(category.toJSON(), req['tz']);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[deleteCategory] Error al eliminar una categoria'
    });
  }
};
