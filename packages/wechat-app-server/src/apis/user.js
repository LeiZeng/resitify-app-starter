exports.login = function (req, res, next) {
  var user = {};
  // console.log(req);
  user.username = req.body.username;
  user.password = req.body.password;
  res.send(200, user);
  next();
};

exports.hello = function (req, res, next) {
  var name = req.query.name || 'unknown';
  res.send(200, "Hello " + name + "!");
  next();
};
