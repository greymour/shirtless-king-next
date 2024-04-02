import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { DATABASE_AUTH_TOKEN, DATABASE_URL } from "@/utils/constants"

const client = createClient({ url: DATABASE_URL, authToken: DATABASE_AUTH_TOKEN });
const db = drizzle(client);

export default db;