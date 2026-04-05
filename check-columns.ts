import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL!);

async function main() {
  const res = await sql`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'Experience'
  `;
  console.log('Columns for Experience:', JSON.stringify(res, null, 2));
  
  const res2 = await sql`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'Education'
  `;
  console.log('Columns for Education:', JSON.stringify(res2, null, 2));
}

main().catch(console.error);
