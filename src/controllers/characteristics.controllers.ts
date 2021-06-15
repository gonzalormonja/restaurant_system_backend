import { Request, Response } from 'express';
import Characteristic from '../models/characteristic';

export const getCharacteristics = async (req: Request, res: Response) => {
  try {
    const characteristics = await Characteristic.findAll();
    res.json(characteristics);
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
    const category = Characteristic.build(body);
    await category.save();
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[postCharacteristic] Error al crear una caracteristica'
    });
  }
};

export const getCharacteristic = (req: Request, res: Response) => {
  const { id } = req.params;

  const category = Characteristic.findByPk(id);

  if (!category) {
    return res.status(404).json({
      msg: `No existe una caracteristica con el id ${id}`
    });
  }

  res.json(category);
};

export const putCharacteristic = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const category = await Characteristic.findByPk(id);
    if (!category) {
      return res.status(404).json({
        msg: `No existe una caracteristica con el id ${id}`
      });
    }

    await category.update(body);
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[putCharacteristic] Error al actualizar un menu'
    });
  }
};

export const deleteCharacteristic = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Characteristic.findByPk(id);
    if (!category) {
      return res.status(404).json({
        msg: `No existe una caracteristica con el id ${id}`
      });
    }

    await category.update({ state: false });
    return res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[deleteCharacteristic] Error al eliminar una caracteristica'
    });
  }
};