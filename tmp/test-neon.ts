import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config();

const sql = neon(process.env.DATABASE_URL!);

async function main() {
  try {
    const projects = await sql`SELECT * FROM "Project"`;
    console.log("Projects found:", projects.length);
    if (projects.length > 0) {
      console.log("First project title:", projects[0].title);
    }
  } catch (error) {
    console.error("Neon Error:", error);
  } finally {
    process.exit();
  }
}

main();
