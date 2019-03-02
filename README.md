# Express Swagger Role

Middleware for swagger definition driven role system.

## Install

```bash
npm install express-swagger-role --save
```

## Usage

The package check the *req.user.role* property of endpoint handler and the *x-roles* array property of the swagger file.

as middleware
```javascript
const expressSwaggerRole = require('express-swagger-role');

app.use(expressSwaggerRole.middleware());
```

as method
```javascript
const expressSwaggerRole = require('express-swagger-role');

app.get('/', (req, res) => {
  if (exporessSwaggerRole.roleChecker(req)) {
    console.log('This log run only for admins');
  }
});
```

swagger configuration:
```javascript
{
  "paths": {
    "/": {
      "get": {
        "x-roles": ["admin"],
        "responses": {
          "200": {
            "description": "Test endpoint"
          }
        }
      }
    }
  }
}
```