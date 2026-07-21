import { query } from '@/lib/db';
import type { EndpointDef } from '@/store/endpointStore';

function rowToEndpoint(row: any): EndpointDef {
  return {
    id: row.id,
    category: row.category,
    group: row.group_name,
    name: row.name,
    method: row.method,
    path: row.path,
    description: row.description || '',
    defaultPayload: row.default_payload || {},
    schema: row.schema_fields || { name: 'Payload', fields: [] },
    responseSchema: row.response_schema_fields || { name: 'Response', fields: [] },
    responses: row.response_schema_fields?.responses || [],
    presets: row.presets || [],
    sortOrder: row.sort_order ?? 0,
  };
}

export async function listEndpoints(): Promise<EndpointDef[]> {
  const { rows } = await query('SELECT * FROM endpoints ORDER BY sort_order ASC, id ASC');
  return rows.map(rowToEndpoint);
}

export async function upsertEndpoint(endpoint: EndpointDef): Promise<void> {
  await query(
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

export async function deleteEndpoint(id: string): Promise<void> {
  await query('DELETE FROM endpoints WHERE id = $1', [id]);
}

export async function deleteCategory(category: string): Promise<void> {
  await query('DELETE FROM endpoints WHERE category = $1', [category]);
}
