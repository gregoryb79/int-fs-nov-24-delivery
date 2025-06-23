import { createClient } from "@libsql/client";

const sqlConnectionString = process.env.SQL_CONNECTION_STRING;
if (!sqlConnectionString) {
  throw new Error("SQL_CONNECTION_STRING environment variable is not set");
}

export const client = createClient({
  url: sqlConnectionString,
  authToken: process.env.TURSO_AUTH_TOKEN, // if required
});