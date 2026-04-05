import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config();

const sql = neon(process.env.DATABASE_URL!);

async function main() {
  try {
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log("Tables found:", tables.map(t => t.table_name));
    
    // Check one table specifically
    const rows = await sql`SELECT count(*) FROM "Project"`;
    console.log("Projects count:", rows[0].count);
    
  } catch (error) {
    console.error("Neon Error:", error);
  } finally {
    process.exit();
  }
}

main();
