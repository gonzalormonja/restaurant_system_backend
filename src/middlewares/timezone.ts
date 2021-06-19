const timezone = (req, res, next) => {
  let { tz } = req.headers;
  if (!tz) {
    return res.status(400).json({
      msg: '[timezone] la zona horaria es requerida'
    });
  }
  if (tz.toString().charAt(0) != '+' && tz.toString().charAt(0) != '-') {
    tz = `+${tz}`;
  }
  req.tz = `UTC${tz}`;
  next();
};

export default timezone;
