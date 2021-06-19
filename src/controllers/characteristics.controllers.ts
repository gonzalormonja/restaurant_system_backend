import { Request, Response } from 'express';
import Characteristic from '../models/characteristic';
import { changeTimezoneObject } from '../utils/chage-timezone-object';

export const getCharacteristics = async (req: Request, res: Response) => {
  try {
    const characteristics = await Characteristic.findAll({
      where: { idCustomer: req['user'].idCustomer }
    });
    res.json(characteristics.map((characteristic) => changeTimezoneObject(characteristic.toJSON(), req['tz'])));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[getCharacteristics] Error al crear una caracteristica'
    });
  }
};

export const postCharacteristic = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const characteristic = await Characteristic.create({ ...body, idCustomer: req['user'].idCustomer });
    return res.json(changeTimezoneObject(characteristic.toJSON(), req['tz']));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[postCharacteristic] Error al crear una caracteristica'
    });
  }
};

export const getCharacteristic = async (req: Request, res: Response) => {
  const { id } = req.params;

  const characteristic = await Characteristic.findOne({
    where: {
      $and: [
        { id: id },
        {
          idCustomer: req['user'].idCustomer
        }
      ]
    }
  });

  if (!characteristic) {
    return res.status(404).json({
      msg: `No existe una caracteristica con el id ${id}`
    });
  }

  return res.json(changeTimezoneObject(characteristic.toJSON(), req['tz']));
};

export const putCharacteristic = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const characteristic = await Characteristic.findOne({
      where: {
        $and: [
          { id: id },
          {
            idCustomer: req['user'].idCustomer
          }
        ]
      }
    });
    if (!characteristic) {
      return res.status(404).json({
        msg: `No existe una caracteristica con el id ${id}`
      });
    }

    await characteristic.update(body);
    return res.json(changeTimezoneObject(characteristic.toJSON(), req['tz']));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[putCharacteristic] Error al actualizar un product'
    });
  }
};

export const deleteCharacteristic = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const characteristic = await Characteristic.findOne({
      where: {
        $and: [
          { id: id },
          {
            idCustomer: req['user'].idCustomer
          }
        ]
      }
    });
    if (!characteristic) {
      return res.status(404).json({
        msg: `No existe una caracteristica con el id ${id}`
      });
    }

    await characteristic.update({ state: false });
    return res.json(changeTimezoneObject(characteristic.toJSON(), req['tz']));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[deleteCharacteristic] Error al eliminar una caracteristica'
    });
  }
};
