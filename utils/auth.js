const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  console.log(req.session)
  console.log('withAuth middleware, req.session.logged_in:', req.session.logged_in)
  if (!req.session.logged_in) {
    res.redirect('/signUpIn');
  } else {
    next();
  }
};

module.exports = withAuth;
