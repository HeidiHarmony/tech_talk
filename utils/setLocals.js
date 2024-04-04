module.exports = (req, res, next) => {
    if (req.session && req.session.user) {
      res.locals.user = req.session.user;
      res.locals.logged_in = req.session.logged_in;
    } else {
      res.locals.user = false;
      res.locals.logged_in = false;
    }
    next();
  };