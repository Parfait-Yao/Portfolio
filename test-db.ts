import { Pool } from '@neondatabase/serverless'
import 'dotenv/config'

async function test() {
  const connectionString = process.env.DATABASE_URL
  console.log('Testing with URL:', connectionString ? '(string set)' : '(missing)')
  const pool = new Pool({ connectionString })
  try {
    const client = await pool.connect()
    const res = await client.query('SELECT NOW()')
    console.log('Connection successful!', res.rows[0])
    client.release()
  } catch (err) {
    console.error('Connection failed!', err)
  } finally {
    await pool.end()
  }
}

test()
