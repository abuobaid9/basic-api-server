'use strict';
function validator() {
  return (req, res, next) => {
    if (req.params.id) {
      next();
    } else {
      res.status(400).json({ message: 'error' });
    }
  }
}
module.exports = validator;