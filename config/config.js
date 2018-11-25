const path = require('path');

module.exports = {
  development: {
    username: 'root',
    password: 'my_secret_password',
    database: 'hostmaker_development',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    storage: path.resolve(__dirname, '..', 'test', 'integration', 'db', 'database.sqlite'),
    dialect: 'sqlite',
  },
  production: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  },
};
