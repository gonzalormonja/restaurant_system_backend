import { Op } from 'sequelize';
import Category from '../models/category';
import Characteristic from '../models/characteristic';
import Ingredient from '../models/ingredient';
import Price from '../models/price';
import Product from '../models/product';

export default class ProductService {
  private join_object = (): any => {
    return {
      include: [
        { model: Category },
        { model: Price },
        { model: Product, as: 'garnishes' },
        { model: Product, as: 'productsOfGarnish' },
        { model: Characteristic },
        { model: Ingredient }
      ],
      order: [[Price, 'createdAt', 'asc']]
    };
  };

  add_last_price = (product) => {
    return {
      ...product,
      price: product.prices[product.prices.length - 1].price
    };
  };

  getProduct = async (id, idCustomer) => {
    const product = await Product.findOne({
      mapToModel: true,
      where: {
        [Op.and]: [{ id: id }, { idCustomer: idCustomer }, { state: 1 }]
      },
      ...this.join_object()
    });
    return this.add_last_price(product.toJSON());
  };
}
