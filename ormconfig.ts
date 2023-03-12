const mode = process.env.API_MODE !== 'DEV' ? 'dist' : 'src';

module.exports = {
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [`./${mode}/modules/**/entities/*{.js,.ts}`],
  migrations: [`./${mode}/shared/database/migrations/*{.js,.ts}`],
  seeds: [`./${mode}/shared/database/seeds/*{.js,.ts}`],
  factories: [`./${mode}/shared/database/factories/*{.ts,.js}`],
  cli: {
    migrationsDir: './src/shared/database/migrations',
  },
};
