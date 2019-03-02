const defaultOptions = {
  swaggerRolesProperty: 'x-roles',
  anonymusRole: 'anonymus',
  unauthorizedText: 'Unauthorized'
};

const roleChecker = (req, allowedRoles = [], options) => {
  const path = req.swagger.path;
  if (!path) return true;

  const method = req.method.toLowerCase();
  const endpoint = path[method];
  if (!endpoint) return true;

  const requiredRoles = endpoint[options.swaggerRolesProperty];
  if (!requiredRoles) return true;

  if (requiredRoles.includes(options.anonymusRole)) return true;

  for (let i = 0; i < allowedRoles.length; i++) {
    const allowedRole = allowedRoles[i];
    if (requiredRoles.includes(allowedRole)) return true;
  }

  return false;
};

const middleware = (allowedRoles = [], options = {}) => (req, res, next) => {
  options = Object.assign({}, defaultOptions, options);
  if (roleChecker(req, allowedRoles, options)) {
    next();
  } else {
    res.status(401).send(options.unauthorizedText);
  }
};

module.exports = { roleChecker, middleware };
