import { Client, escapeIdentifier } from 'pg';
import { config } from 'dotenv';

config();

async function createDatabaseIfNotExist() {
  const dbName = process.env.DB_DATABASE;
  if (!dbName?.trim()) {
    throw new Error('DB_DATABASE must be set in .env');
  }

  const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? '5432'),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'postgres',
    connectionTimeoutMillis: 10_000,
  });

  try {
    await client.connect();
    const result = await client.query(
      'SELECT 1 FROM pg_catalog.pg_database WHERE datname = $1',
      [dbName],
    );

    if (result.rowCount === 0) {
      await client.query(`CREATE DATABASE ${escapeIdentifier(dbName)}`);
      console.log(`Database ${dbName} created`);
    } else {
      console.log(`Database ${dbName} already exists`);
    }
  } finally {
    await client.end();
  }
}

try {
  await createDatabaseIfNotExist();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
