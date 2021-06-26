import { Request, Response } from 'express';
import { Op } from 'sequelize';
import TimeOfDay from '../models/timesOfDay';
import { changeTimezoneObject, convert_stringHour_to_date } from '../utils/datetime-functions';

export const getTimesOfDay = async (req: Request, res: Response) => {
  try {
    const timesOfDay = await TimeOfDay.findAll({
      where: { idCustomer: req['user'].idCustomer }
    });
    res.json(timesOfDay.map((timeOfDay) => changeTimezoneObject(timeOfDay.toJSON(), req['tz'])));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[getTimesOfDay] Error al obtener los periodos del día'
    });
  }
};

export const postTimeOfDay = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const timeOfDay = await TimeOfDay.create({
      ...body,
      hour_start: convert_stringHour_to_date(body['hour_start'], req['tz']),
      hour_end: convert_stringHour_to_date(body['hour_end'], req['tz']),
      idCustomer: req['user'].idCustomer
    });
    changeTimezoneObject(timeOfDay.toJSON(), req['tz']);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[postTimeOfDay] Error al crear un periodo del día'
    });
  }
};

export const getTimeOfDay = async (req: Request, res: Response) => {
  const { id } = req.params;

  const timeOfDay = await TimeOfDay.findOne({
    where: {
      [Op.and]: [
        { id: id },
        {
          idCustomer: req['user'].idCustomer
        }
      ]
    }
  });

  if (!timeOfDay) {
    return res.status(404).json({
      msg: `No existe un periodo del día con el id ${id}`
    });
  }

  changeTimezoneObject(timeOfDay.toJSON(), req['tz']);
};

export const putTimeOfDay = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const timeOfDay = await TimeOfDay.findOne({
      where: {
        [Op.and]: [
          { id: id },
          {
            idCustomer: req['user'].idCustomer
          }
        ]
      }
    });
    if (!timeOfDay) {
      return res.status(404).json({
        msg: `No existe un periodo del día con el id ${id}`
      });
    }

    await timeOfDay.update(body);
    changeTimezoneObject(timeOfDay.toJSON(), req['tz']);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[putTimeOfDay] Error al actualizar un product'
    });
  }
};

export const deleteTimeOfDay = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const timeOfDay = await TimeOfDay.findOne({
      where: {
        [Op.and]: [
          { id: id },
          {
            idCustomer: req['user'].idCustomer
          }
        ]
      }
    });
    if (!timeOfDay) {
      return res.status(404).json({
        msg: `No existe un periodo del día con el id ${id}`
      });
    }

    await timeOfDay.update({ state: false });
    return changeTimezoneObject(timeOfDay.toJSON(), req['tz']);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: '[deleteTimeOfDay] Error al eliminar un periodo del día'
    });
  }
};
