import { Client } from 'pg';
import { readFileSync, readdirSync } from 'fs';
import { join, basename, extname } from 'path';
import { parseOpenApiToEndpoints } from '../lib/openapiParser.ts';

const APIS_DIR = join(process.cwd(), 'public', 'apis');

async function upsertEndpoint(client: Client, endpoint: any) {
  await client.query(
    `INSERT INTO endpoints (
      id, title, method, path, description, category, group_name, name,
      default_payload, schema_fields, response_schema_fields, presets, sort_order, updated_at
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13, now())
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      method = EXCLUDED.method,
      path = EXCLUDED.path,
      description = EXCLUDED.description,
      category = EXCLUDED.category,
      group_name = EXCLUDED.group_name,
      name = EXCLUDED.name,
      default_payload = EXCLUDED.default_payload,
      schema_fields = EXCLUDED.schema_fields,
      response_schema_fields = EXCLUDED.response_schema_fields,
      presets = EXCLUDED.presets,
      sort_order = EXCLUDED.sort_order,
      updated_at = now()`,
    [
      endpoint.id,
      `${endpoint.group} - ${endpoint.name}`,
      endpoint.method,
      endpoint.path,
      endpoint.description,
      endpoint.category,
      endpoint.group,
      endpoint.name,
      JSON.stringify(endpoint.defaultPayload ?? {}),
      JSON.stringify(endpoint.schema ?? {}),
      endpoint.responses
        ? JSON.stringify({ ...(endpoint.responseSchema ?? {}), responses: endpoint.responses })
        : JSON.stringify(endpoint.responseSchema ?? {}),
      JSON.stringify(endpoint.presets ?? []),
      endpoint.sortOrder ?? 0,
    ]
  );
}

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  const files = readdirSync(APIS_DIR).filter(f => f.toLowerCase().endsWith('.json'));

  for (const file of files) {
    const category = basename(file, extname(file));
    const raw = readFileSync(join(APIS_DIR, file), 'utf8');
    const openApiData = JSON.parse(raw);

    const { rows: existing } = await client.query('SELECT id, method FROM endpoints');

    const { endpoints, count, skipped } = parseOpenApiToEndpoints(openApiData, category, existing);

    for (const ep of endpoints) {
      await upsertEndpoint(client, ep);
    }

    console.log(`${file} -> categoria "${category}": ${count} importados, ${skipped} ignorados (ja existentes)`);
  }

  await client.end();
  console.log('Importacao concluida.');
}

main().catch(err => {
  console.error('Falha ao importar APIs:', err);
  process.exit(1);
});
