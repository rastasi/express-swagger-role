# Express Swagger Role

Middleware for swagger definition driven role system.

## Install

```bash
npm install express-savagger-role --save
```

## Usage

as middleware

```javascript
const expressSwaggerRole = require('express-swagger-role');

app.use(expressSwaggerRole.middleware(['normal', 'admin']));
```

as method

```javascript
const expressSwaggerRole = require('express-swagger-role');

app.get('/', (req, res) => {
  if (exporessSwaggerRole.roleChecker(req, ['admin']) {
    console.log('This log run only for admins');
  }
});
```