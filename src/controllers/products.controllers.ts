import { Request, Response } from 'express';
import Category from '../models/category';
import Ingredient from '../models/ingredient';
import Product from '../models/product';
import ProductIngredient from '../models/productIngredient';
import Price from '../models/price';
import { changeTimezoneObject } from '../utils/datetime-functions';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize';
import ProductService from '../services/products.services';

export const getProducts = async (req: Request, res: Response) => {
  const productService = new ProductService();
  let { search, pageNumber, pageSize, columnOrder, order, idCategories } = req.query as any;

  const pipeline: any[] = [];

  if (search) {
    const searchQuery = { [Op.like]: `%${search}%` };
    pipeline.push({
      where: {
        [Op.and]: [
          { [Op.or]: [{ name: searchQuery }, { short_name: searchQuery }, { bar_code: searchQuery }] },
          {
            idCustomer: req['user'].idCustomer
          },
          { state: 1 }
        ]
      }
    });
  } else {
    pipeline.push({
      where: {
        state: 1
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
  pipeline.push({
    include: [
      { model: Category },
      { model: Price },
      { model: Product, as: 'productsOfGarnish' },
      { model: Ingredient }
    ]
  });
  if (!columnOrder) {
    columnOrder = 'id';
  }
  if (!order) {
    order = 'desc';
  }
  pipeline.push({
    order: [
      [Sequelize.literal(columnOrder), order],
      [Price, 'createdAt', 'asc']
    ]
  });

  pipeline.push({
    attributes: ['createdAt', 'id', 'name', 'short_name', 'state']
  });

  const products = await Product.findAll(pipeline.reduce((acc, el) => ({ ...acc, ...el }), {}));
  let totalData = 0;
  if (search) {
    const searchQuery = { [Op.like]: `%${search}%` };
    totalData = await Product.count({
      where: {
        [Op.and]: [
          { [Op.or]: [{ name: searchQuery }, { short_name: searchQuery }, { bar_code: searchQuery }] },
          {
            idCustomer: req['user'].idCustomer
          },
          { state: 1 }
        ]
      }
    });
  } else {
    totalData = await Product.count({
      where: {
        state: 1
      }
    });
  }

  res.json({
    totalData: totalData,
    data: products.map((product) => {
      const prod = productService.add_last_price(product.toJSON());
      Reflect.deleteProperty(prod, 'prices');
      return changeTimezoneObject(prod, req['tz']);
    })
  });
};

export const postProduct = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    let product = await Product.create({ ...body, idCustomer: req['user'].idCustomer });
    //* add ingredients
    body.ingredients?.map(async (ingredient) => {
      const ingredientRecord = await Ingredient.findByPk(ingredient.id);
      if (ingredientRecord) {
        ProductIngredient.create({
          idIngredient: ingredientRecord.id,
          idProduct: product.id,
          quantity: ingredient.quantity
        });
      }
    });

    //* add price
    await Price.create({ price: body.price ? body.price : 0, idProduct: product.id });
    product = await Product.findByPk(product.id, { include: [Category] });
    res.json(changeTimezoneObject(product.toJSON(), req['tz']));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[postProduct] Error al crear un product'
    });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const productService = new ProductService();
  const product = await productService.getProduct(id, req['user'].idCustomer);
  let categoryName = product.category.name;
  let categoryFather = await Category.findByPk(product.category.idCategory);
  while (categoryFather) {
    categoryName = `${categoryFather.name} -> ${categoryName}`;
    categoryFather = await Category.findByPk(categoryFather.idCategory);
  }
  product.category_name = categoryName;
  if (!product) {
    return res.status(404).json({
      msg: `No existe un product con el id ${id}`
    });
  }
  res.json(changeTimezoneObject(product, req['tz']));
};

export const patchProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  const productService = new ProductService();

  try {
    const product = await productService.getProduct(id, req['user'].idCustomer);

    let productObject: any = await Product.findOne({
      where: {
        [Op.and]: [{ id: id }, { idCustomer: req['user'].idCustomer }]
      }
    });

    if (!productObject) {
      return res.status(404).json({
        msg: `No existe un product con el id ${id}`
      });
    }

    await productObject.update(body);

    //* update ingredients
    if (body.ingredients) {
      //* delete previous ingredients
      ProductIngredient.destroy({
        where: {
          idProduct: id
        }
      });
      //*add ingredients
      body.ingredients?.map(async (ingredient) => {
        const ingredientRecord = await Ingredient.findByPk(ingredient.id);
        if (ingredientRecord) {
          ProductIngredient.create({
            idIngredient: ingredientRecord.id,
            idProduct: productObject.id,
            quantity: ingredient.quantity
          });
        }
      });
    }

    if (body.price && product.price != body.price) {
      //* add price
      await Price.create({ price: body.price ? body.price : 0, idProduct: productObject.id });
    }

    productObject = await productService.getProduct(id, req['user'].idCustomer);
    res.json(changeTimezoneObject(productObject, req['tz']));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[putProduct] Error al actualizar un product'
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      where: {
        [Op.and]: [{ id: id }, { idCustomer: req['user'].idCustomer }]
      }
    });
    if (!product) {
      return res.status(404).json({
        msg: `No existe un product con el id ${id}`
      });
    }

    await product.update({ state: false });
    return res.json(changeTimezoneObject(product.toJSON(), req['tz']));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[deleteProduct] Error al eliminar un product'
    });
  }
};
