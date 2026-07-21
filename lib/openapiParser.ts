import type { EndpointDef } from '@/store/endpointStore';

export interface ParseOpenApiResult {
  endpoints: EndpointDef[];
  category: string;
  count: number;
  skipped: number;
}

function getDummyValue(type: string, format?: string) {
  if (type === 'number' || type === 'integer' || type === 'number($double)' || type === 'integer($int64)') return 0;
  if (type === 'boolean') return false;
  if (format === 'date-time') return new Date().toISOString();
  return '';
}

// Recursively extract schema fields and generate dummy mock payload values from OpenAPI schemas
function resolveSchema(schemaObj: any, rootData: any, prefix = ''): { fields: any[], dummyValue: any } {
  let fields: any[] = [];
  let dummyValue: any = null;

  if (!schemaObj) return { fields, dummyValue };

  let currentSchema = schemaObj;
  if (schemaObj.$ref) {
    const refName = schemaObj.$ref.split('/').pop();
    currentSchema = rootData?.components?.schemas?.[refName] || rootData?.definitions?.[refName] || null;
    if (!currentSchema) return { fields, dummyValue: {} };
  }

  const type = currentSchema.type || 'object';

  if (type === 'array') {
    const itemsSchema = currentSchema.items;
    const { fields: subFields, dummyValue: subDummy } = resolveSchema(itemsSchema, rootData, prefix);
    fields = subFields;
    dummyValue = Array.isArray(subDummy) ? subDummy : [subDummy];
  } else if (type === 'object' || currentSchema.properties) {
    const properties = currentSchema.properties || {};
    const requiredList = currentSchema.required || [];
    const obj: any = {};

    for (const [key, propVal] of Object.entries(properties) as any) {
      const fieldName = prefix ? `${prefix}.${key}` : key;

      let propSchema = propVal;
      if (propVal.$ref) {
        const refName = propVal.$ref.split('/').pop();
        propSchema = rootData?.components?.schemas?.[refName] || rootData?.definitions?.[refName] || propVal;
      }

      const propType = propSchema.type || 'string';

      if (propType === 'object' || propSchema.properties) {
        const { fields: subFields, dummyValue: subDummy } = resolveSchema(propSchema, rootData, fieldName);
        fields.push({
          name: fieldName,
          type: 'object',
          description: propVal.description || '',
          required: requiredList.includes(key)
        });
        fields.push(...subFields);
        obj[key] = subDummy;
      } else if (propType === 'array') {
        const itemsSchema = propSchema.items;
        const { fields: subFields, dummyValue: subDummy } = resolveSchema(itemsSchema, rootData, `${fieldName}[]`);
        fields.push({
          name: fieldName,
          type: 'array',
          description: propVal.description || '',
          required: requiredList.includes(key)
        });
        fields.push(...subFields);
        obj[key] = Array.isArray(subDummy) ? subDummy : [subDummy];
      } else {
        fields.push({
          name: fieldName,
          type: propType,
          description: propVal.description || '',
          required: requiredList.includes(key)
        });
        obj[key] = getDummyValue(propType, propVal.format);
      }
    }
    dummyValue = obj;
  } else {
    dummyValue = getDummyValue(type, currentSchema.format);
  }

  return { fields, dummyValue };
}

export function parseOpenApiToEndpoints(
  openApiData: any,
  categoryNameInput: string,
  existingEndpoints: Pick<EndpointDef, 'id' | 'method'>[] = []
): ParseOpenApiResult {
  if (!openApiData?.paths) {
    throw new Error('Arquivo JSON inválido: não contém "paths". O formato deve ser OpenAPI/Swagger válido.');
  }

  const category = categoryNameInput.trim() || openApiData.info?.title || 'Nova API';
  const categorySlug = category
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const endpoints: EndpointDef[] = [];
  let count = 0;
  let skipped = 0;
  let sortOrder = 0;

  for (const [path, methods] of Object.entries(openApiData.paths)) {
    for (const [method, rawDetails] of Object.entries(methods as any)) {
      if (!['get', 'post', 'put', 'delete', 'patch'].includes(method.toLowerCase())) continue;

      const details = rawDetails as any;

      const rawId = path.replace(/^\//, '').toLowerCase().replace(/\//g, '-');
      const id = `${categorySlug}-${rawId}`;

      if (existingEndpoints.some(e => e.id === id && e.method.toLowerCase() === method.toLowerCase())) {
        skipped++;
        continue;
      }

      const group = details.tags ? details.tags[0] : 'Geral';

      let generatedName = path.split('/').filter(Boolean);
      let version = '';
      if (generatedName[0] && generatedName[0].toLowerCase().startsWith('v') && !isNaN(Number(generatedName[0][1]))) {
        version = generatedName.shift() as string;
      }
      if (generatedName.length > 1) {
        generatedName.shift();
      }
      let nameStr = generatedName.join(' ');
      nameStr = nameStr.replace(/([a-z])([A-Z])/g, '$1 $2').trim().replace(/\s+/g, ' ');
      if (version) {
        nameStr += ` (${version})`;
      }
      let name = id.endsWith('v3-tracking-positionhistory-list') ? 'Position History (v3)' : nameStr;
      if (id.endsWith('login')) name = 'Login';

      let defaultPayload: any = {};
      let schemaFields: any[] = [];
      let schemaName = 'Payload';

      if (details.parameters && details.parameters.length > 0) {
        const queryParams = details.parameters.filter((p: any) => p.in === 'query' || p.in === 'path');
        if (queryParams.length > 0) {
          queryParams.forEach((p: any) => {
            schemaFields.push({
              name: p.name,
              type: p.schema?.type || 'string',
              description: p.description || '',
              required: p.required || false
            });
            defaultPayload[p.name] = getDummyValue(p.schema?.type);
          });
        }
      }

      let reqSchema = details.requestBody?.content?.['application/json']?.schema ||
                      details.requestBody?.content?.['application/json-patch+json']?.schema;

      if (!reqSchema && details.parameters) {
        const bodyParam = details.parameters.find((p: any) => p.in === 'body');
        if (bodyParam?.schema) {
          reqSchema = bodyParam.schema;
        }
      }

      if (reqSchema) {
        if (reqSchema.$ref) {
          schemaName = reqSchema.$ref.split('/').pop();
        } else if (reqSchema.type === 'array' && reqSchema.items?.$ref) {
          schemaName = reqSchema.items.$ref.split('/').pop() + '[]';
        }

        const { fields, dummyValue } = resolveSchema(reqSchema, openApiData);
        schemaFields = fields;
        defaultPayload = dummyValue || {};
      }

      let responseSchemaFields: any[] = [];
      let responseSchemaName = 'Response';

      const resSchema = details.responses?.['200']?.content?.['application/json']?.schema ||
                        details.responses?.['200']?.content?.['text/json']?.schema;
      if (resSchema) {
        if (resSchema.$ref) {
          responseSchemaName = resSchema.$ref.split('/').pop();
        } else if (resSchema.type === 'array' && resSchema.items?.$ref) {
          responseSchemaName = resSchema.items.$ref.split('/').pop() + '[]';
        }
        const { fields } = resolveSchema(resSchema, openApiData);
        responseSchemaFields = fields;
      } else if (details.responses?.['200']?.schema) {
        const { fields } = resolveSchema(details.responses['200'].schema, openApiData);
        responseSchemaFields = fields;
      }

      let parsedResponses: any[] = [];
      if (details.responses) {
        for (const [code, resVal] of Object.entries(details.responses)) {
          const resObj = resVal as any;
          let resSchemaObj = resObj.content?.['application/json']?.schema ||
                             resObj.content?.['text/json']?.schema ||
                             resObj.schema;

          let responseFields: any[] = [];
          let responseDummyValue: any = null;
          let currentResponseSchemaName = `Response${code}`;

          if (resSchemaObj) {
            if (resSchemaObj.$ref) {
              currentResponseSchemaName = resSchemaObj.$ref.split('/').pop();
            } else if (resSchemaObj.type === 'array' && resSchemaObj.items?.$ref) {
              currentResponseSchemaName = resSchemaObj.items.$ref.split('/').pop() + '[]';
            }
            const { fields, dummyValue } = resolveSchema(resSchemaObj, openApiData);
            responseFields = fields;
            responseDummyValue = dummyValue;
          }

          parsedResponses.push({
            code,
            description: resObj.description || '',
            schema: responseFields.length > 0 ? {
              name: currentResponseSchemaName,
              fields: responseFields
            } : undefined,
            example: responseDummyValue
          });
        }
      }

      if (path === '/Tracking/Actuator/List' || path.toLowerCase() === '/tracking/actuator/list') {
        const index200 = parsedResponses.findIndex(r => r.code === '200');
        const fallbackExample = [{ IdActuator: 0, Name: 'string' }];
        const fallbackSchema = {
          name: 'ActuatorResult[]',
          fields: [
            { name: 'IdActuator', type: 'integer', description: 'ID do atuador', required: true },
            { name: 'Name', type: 'string', description: 'Nome do atuador', required: true }
          ]
        };
        if (index200 !== -1) {
          parsedResponses[index200].example = fallbackExample;
          parsedResponses[index200].schema = fallbackSchema;
        } else {
          parsedResponses.push({ code: '200', description: 'Sucesso.', schema: fallbackSchema, example: fallbackExample });
        }
      }

      let presets: any[] = [];
      if (id.endsWith('v3-tracking-positionhistory-list') || id.endsWith('tracking-positionhistory-list')) {
        presets = [
          { name: 'Posições de hoje', payload: [{ PropertyName: 'EventDate', Condition: 'GreaterThan', Value: new Date().toISOString().split('T')[0] }] },
          { name: 'Posições do dia atual (String)', payload: [{ PropertyName: 'EventDate', Condition: 'GreaterThan', Value: 'DIA ATUAL' }] },
          { name: 'Última posição', payload: [{ PropertyName: 'IdPosition', Condition: 'GreaterThan', Value: '1' }] },
          { name: 'A partir do último IdPosition', payload: [{ PropertyName: 'IdPosition', Condition: 'GreaterThan', Value: 'LastIdPosition' }] }
        ];
        defaultPayload = [{ PropertyName: 'TrackedUnitIntegrationCode', Condition: 'Equal', Value: '0001' }];
      }

      if (schemaName === 'QueryCondition[]' || schemaName === 'QueryCondition') {
        if (!defaultPayload || (Array.isArray(defaultPayload) && defaultPayload.length === 0) || Object.keys(defaultPayload).length === 0) {
          defaultPayload = [{ PropertyName: 'NomeDaPropriedade', Condition: 'Equal', Value: 'Valor' }];
        }
      }

      let desc = details.description || details.summary || '';
      if (desc === name) desc = '';

      endpoints.push({
        id,
        category,
        group,
        name,
        method: method.toUpperCase() as any,
        path,
        description: desc,
        defaultPayload,
        schema: { name: schemaName, fields: schemaFields },
        responseSchema: { name: responseSchemaName, fields: responseSchemaFields },
        responses: parsedResponses,
        presets,
        sortOrder: sortOrder++
      });
      count++;
    }
  }

  return { endpoints, category, count, skipped };
}
