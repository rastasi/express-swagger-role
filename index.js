const defaultOptions = {
  swaggerRolesProperty: 'x-roles',
  anonymusRole: 'anonymus',
  unauthorizedText: 'Unauthorized'
};

const roleChecker = (req, allowedRoles = [], options) => {
  const requiredRoles = req.swagger[options.swaggerRolesProperty];
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
