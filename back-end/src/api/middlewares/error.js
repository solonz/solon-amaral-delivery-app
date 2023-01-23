// esta função recebe os erros que voce lança no seguinte formato:
// throw { status: 404, message: Not Found }
const error = (err, req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || 'Unexpected error, please, try again later';

  return res.status(status).json({ message });
};

module.exports = error;
