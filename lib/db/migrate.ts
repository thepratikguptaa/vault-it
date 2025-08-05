import {migrate} from "drizzle-orm/neon-http/migrator";
import {drizzle} from "drizzle-orm/neon-http";
import {neon} from "@neondatabase/serverless";

import * as dotenv from "dotenv";

dotenv.config({path: ".env"})

if(!process.env.DATABASE_URL) {
    throw new Error ("Database URL is not set in .env");
}

async function runMigration() {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const db = drizzle(sql);

        await migrate(db, {migrationsFolder: "./drizzle"});
        console.log("All migrations are successfully done");
        
    } catch (error) {
        console.log("Error while running migrations", error);
        process.exit(1);
    }
}

runMigration()