import { Request, Response } from 'express';
import Category from '../models/category';
import Characteristic from '../models/characteristic';
import Ingredient from '../models/ingredient';
import Product from '../models/product';
import ProductCharacteristic from '../models/productCharacteristic';
import ProductGarnish from '../models/productGarnish';
import ProductIngredient from '../models/productIngredient';
import Price from '../models/price';
import { changeTimezoneObject } from '../utils/datetime-functions';

export const getProducts = async (req: Request, res: Response) => {
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
      { model: Product, as: 'garnishes' },
      { model: Product, as: 'productsOfGarnish' },
      { model: Characteristic },
      { model: Ingredient }
    ]
  });
  pipeline.push({
    where: {
      idCustomer: req['user'].idCustomer
    }
  });
  const products = await Product.findAll(pipeline.reduce((acc, el) => ({ ...acc, ...el }), {}));
  res.json(products.map((product) => changeTimezoneObject(product.toJSON(), req['tz'])));
};

export const postProduct = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const product = await Product.create({ ...body, idCustomer: req['user'].idCustomer });
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

    //* add characteristics
    body.idCharacteristics?.map(async (idCharacteristic) => {
      const characteristicRecord = await Characteristic.findByPk(idCharacteristic);
      if (characteristicRecord) {
        ProductCharacteristic.create({
          idCharacteristic: characteristicRecord.id,
          idProduct: product.id
        });
      }
    });

    //* add garnishes
    body.garnishes?.map(async (garnish) => {
      const garnishRecord = await Product.findByPk(garnish.id);
      if (garnishRecord) {
        if (!garnishRecord.isGarnish) {
          throw new Error(`El product ${garnishRecord.name} no es una guarnicion valida`);
        }
        ProductGarnish.create({
          idGarnish: garnishRecord.id,
          idProduct: product.id,
          max_quantity: garnish.max_quantity
        });
      }
    });

    //* add price
    await Price.create({ price: body.price ? body.price : 0, idProduct: product.id });

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
  const product = await Product.findOne({
    where: {
      $and: [{ id: id }, { idCustomer: req['user'].idCustomer }]
    }
  });

  if (!product) {
    return res.status(404).json({
      msg: `No existe un product con el id ${id}`
    });
  }

  res.json(changeTimezoneObject(product.toJSON(), req['tz']));
};

export const patchProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const product = await Product.findOne({
      where: {
        $and: [{ id: id }, { idCustomer: req['user'].idCustomer }]
      }
    });
    if (!product) {
      return res.status(404).json({
        msg: `No existe un product con el id ${id}`
      });
    }

    await product.update(body);

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
            idProduct: product.id,
            quantity: ingredient.quantity
          });
        }
      });
    }

    //* update characteristics
    if (body.idCharacteristics) {
      //* delete previous characteristics
      ProductCharacteristic.destroy({
        where: {
          idProduct: id
        }
      });
      //* add characteristics
      body.idCharacteristics?.map(async (idCharacteristic) => {
        const characteristicRecord = await Characteristic.findByPk(idCharacteristic);
        if (characteristicRecord) {
          ProductCharacteristic.create({
            idCharacteristic: characteristicRecord.id,
            idProduct: product.id
          });
        }
      });
    }

    //* update granishes
    if (body.granishes) {
      //* delete previous granishes
      ProductGarnish.destroy({
        where: {
          idProduct: id
        }
      });

      //* add garnishes
      body.garnishes?.map(async (garnish) => {
        const garnishRecord = await Product.findByPk(garnish.id);
        if (garnishRecord) {
          if (!garnishRecord.isGarnish) {
            throw new Error(`El product ${garnishRecord.name} no es una guarnicion valida`);
          }
          ProductGarnish.create({
            idGarnish: garnishRecord.id,
            idProduct: product.id,
            max_quantity: garnish.max_quantity
          });
        }
      });
    }

    if (body.price) {
      //* add price
      await Price.create({ price: body.price ? body.price : 0, idProduct: product.id });
    }

    res.json(changeTimezoneObject(product.toJSON(), req['tz']));
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
        $and: [{ id: id }, { idCustomer: req['user'].idCustomer }]
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
