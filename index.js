const defaultOptions = {
  swaggerRolesProperty: 'x-roles',
  anonymusRole: 'anonymus',
  unauthorizedText: 'Unauthorized',
  userProperty: 'user',
  roleProperty: 'role'
};

const roleChecker = (req, options) => {
  const path = req.swagger.path;
  if (!path) return true;

  const method = req.method.toLowerCase();
  const endpoint = path[method];
  if (!endpoint) return true;

  const requiredRoles = endpoint[options.swaggerRolesProperty];
  if (!requiredRoles) return true;

  if (requiredRoles.includes(options.anonymusRole)) return true;

  const role = req[options.userProperty][options.roleProperty];
  if (!role) return false;

  return requiredRoles.includes(role);
};

const middleware = (options = {}) => (req, res, next) => {
  options = Object.assign({}, defaultOptions, options);
  if (roleChecker(req, options)) {
    next();
  } else {
    res.status(401).send(options.unauthorizedText);
  }
};

module.exports = { roleChecker, middleware };
