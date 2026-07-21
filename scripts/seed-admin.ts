import { Client } from 'pg';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

async function main() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD must be set (see .env.local)');
  }

  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  const passwordHash = await bcrypt.hash(password, 10);

  await client.query(
    `INSERT INTO admin_users (id, username, password_hash)
     VALUES ($1, $2, $3)
     ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash`,
    [randomUUID(), username, passwordHash]
  );

  await client.end();
  console.log(`Admin user "${username}" is ready.`);
}

main().catch(err => {
  console.error('Failed to seed admin user:', err);
  process.exit(1);
});
