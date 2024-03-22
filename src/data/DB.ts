import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

// @TODO: add env vars
const client = createClient({ url: "", authToken: "" });
const db = drizzle(client);

export default db;