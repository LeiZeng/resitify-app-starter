exports.login = function (req, res, next) {
  var user = {};
  user.username = req.query.username;
  user.password = req.query.password;
  res.send(200, user);
  next();
};

exports.hello = function (req, res, next) {
  var name = req.query.name || 'unknown';
  res.send(200, "Hello " + name + "!");
  next();
};
