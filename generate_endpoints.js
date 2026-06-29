const fs = require('fs');

const rawJson = fs.readFileSync('./openapi.json', 'utf8');
const openApiData = JSON.parse(rawJson);

const extractFields = (schemaObj, rootData) => {
  let fields = [];
  let properties = schemaObj?.properties;
  let requiredList = schemaObj?.required || [];
  
  // if array, look at items
  let isArray = schemaObj?.type === 'array' || schemaObj?.schema?.type === 'array';
  let targetObj = isArray ? (schemaObj.items || schemaObj.schema?.items) : schemaObj;

  // resolve ref
  if (targetObj?.$ref) {
    const refName = targetObj.$ref.split('/').pop();
    if (rootData?.components?.schemas?.[refName]) {
      properties = rootData.components.schemas[refName].properties;
      requiredList = rootData.components.schemas[refName].required || [];
    } else if (rootData?.definitions?.[refName]) {
      properties = rootData.definitions[refName].properties;
      requiredList = rootData.definitions[refName].required || [];
    }
  }

  if (properties) {
    for (const [key, value] of Object.entries(properties)) {
      fields.push({
        name: key,
        type: value.type || 'string',
        description: value.description || '',
        required: requiredList.includes(key)
      });
    }
  }

  return { fields, isArray };
};

const getDummyValue = (type) => {
  if (type === 'number' || type === 'integer' || type === 'number($double)' || type === 'integer($int64)') return 0;
  if (type === 'boolean') return false;
  return '';
};

function generateNameFromPath(path) {
  let parts = path.split('/').filter(Boolean);
  let version = '';
  if (parts[0] && parts[0].toLowerCase().startsWith('v') && !isNaN(parts[0][1])) {
    version = parts.shift();
  }
  if (parts[0] && parts[0].toLowerCase() === 'tracking') {
    parts.shift();
  }
  let nameStr = parts.join(' ');
  nameStr = nameStr.replace(/([a-z])([A-Z])/g, '$1 $2').trim().replace(/\s+/g, ' ');
  if (version) {
    nameStr += ` (${version})`;
  }
  return nameStr;
}

let endpoints = [];

for (const [path, methods] of Object.entries(openApiData.paths)) {
  for (const [method, details] of Object.entries(methods)) {
    if (!['get', 'post', 'put', 'delete', 'patch'].includes(method.toLowerCase())) continue;

    // Filter out unwanted PositionHistory endpoints
    if (path === '/Tracking/PositionHistory/List' || 
        path === '/Tracking/PositionHistory/ListSoap' || 
        path === '/v2/Tracking/PositionHistory/List') {
        continue;
    }

    const id = path.replace(/^\//, '').toLowerCase().replace(/\//g, '-');
    const group = details.tags ? details.tags[0] : 'Geral';
    
    let name = generateNameFromPath(path);
    if (id === 'v3-tracking-positionhistory-list') name = 'Position History (v3)';
    if (id === 'login') name = 'Login';
    
    let defaultPayload = {};
    let schemaFields = [];
    let schemaName = 'Payload';
    
    // Check parameters
    if (details.parameters && details.parameters.length > 0) {
      const queryParams = details.parameters.filter(p => p.in === 'query' || p.in === 'path');
      if (queryParams.length > 0) {
        queryParams.forEach(p => {
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

    // Check requestBody
    let reqSchema = details.requestBody?.content?.['application/json']?.schema || 
                    details.requestBody?.content?.['application/json-patch+json']?.schema;
                    
    if (!reqSchema && details.parameters) {
       const bodyParam = details.parameters.find(p => p.in === 'body');
       if (bodyParam?.schema) {
         reqSchema = bodyParam.schema;
       }
    }

    if (reqSchema) {
      if (reqSchema.$ref) {
        schemaName = reqSchema.$ref.split('/').pop();
      } else if (reqSchema.type === 'array' && reqSchema.items?.$ref) {
        schemaName = reqSchema.items.$ref.split('/').pop() + "[]";
      }

      const { fields, isArray } = extractFields(reqSchema, openApiData);
      schemaFields = fields;
      
      const dummyObj = {};
      fields.forEach(f => {
        dummyObj[f.name] = getDummyValue(f.type);
      });
      
      defaultPayload = isArray ? [dummyObj] : dummyObj;
    }

    let responseSchemaFields = [];
    let responseSchemaName = 'Response';
    
    const resSchema = details.responses?.['200']?.content?.['application/json']?.schema ||
                      details.responses?.['200']?.content?.['text/json']?.schema;
                      
    if (resSchema) {
      if (resSchema.$ref) {
        responseSchemaName = resSchema.$ref.split('/').pop();
      } else if (resSchema.type === 'array' && resSchema.items?.$ref) {
        responseSchemaName = resSchema.items.$ref.split('/').pop() + "[]";
      }

      const { fields } = extractFields(resSchema, openApiData);
      responseSchemaFields = fields;
    } else if (details.responses?.['200']?.schema) {
      // older swagger format
      const { fields } = extractFields(details.responses['200'].schema, openApiData);
      responseSchemaFields = fields;
    }

    let presets = [];
    if (id === 'v3-tracking-positionhistory-list') {
       presets = [
        {
          name: 'Posições de hoje',
          payload: [
            {
              "PropertyName": "EventDate",
              "Condition": "GreaterThan",
              "Value": new Date().toISOString().split('T')[0]
            }
          ]
        },
        {
          name: 'Posições do dia atual (String)',
          payload: [
            {
              "PropertyName": "EventDate",
              "Condition": "GreaterThan",
              "Value": "DIA ATUAL"
            }
          ]
        },
        {
          name: 'Última posição',
          payload: [
            {
              "PropertyName": "IdPosition",
              "Condition": "GreaterThan",
              "Value": "1"
            }
          ]
        },
        {
          name: 'A partir do último IdPosition',
          payload: [
            {
              "PropertyName": "IdPosition",
              "Condition": "GreaterThan",
              "Value": "LastIdPosition"
            }
          ]
        }
      ];
      // Force default payload to match preset logic
      defaultPayload = [
        {
          "PropertyName": "TrackedUnitIntegrationCode",
          "Condition": "Equal",
          "Value": "0001"
        }
      ];
    }
    
    // For general QueryCondition
    if (schemaName === 'QueryCondition[]' || schemaName === 'QueryCondition') {
        if (!defaultPayload || (Array.isArray(defaultPayload) && defaultPayload.length === 0) || Object.keys(defaultPayload).length === 0) {
            defaultPayload = [
              {
                "PropertyName": "NomeDaPropriedade",
                "Condition": "Equal",
                "Value": "Valor"
              }
            ];
        }
    }

    let desc = details.description || details.summary || '';
    if (desc === name) desc = '';

    endpoints.push({
      id,
      category: 'API Reference',
      group,
      name,
      method: method.toUpperCase(),
      path,
      description: desc,
      defaultPayload,
      schema: { name: schemaName, fields: schemaFields },
      responseSchema: { name: responseSchemaName, fields: responseSchemaFields },
      presets
    });
  }
}

// Order endpoints by group
const groupOrder = [
  '_Login',
  'Actuator',
  'Command',
  'Event',
  'Fuel',
  'Message',
  'Person',
  'PositionHistory',
  'Report',
  'RuleCompatible',
  'RuleList',
  'RuleViolation',
  'Sensor',
  'Telemetry',
  'Trailer',
  'Videotelemetry'
];

endpoints.sort((a, b) => {
  let idxA = groupOrder.indexOf(a.group);
  let idxB = groupOrder.indexOf(b.group);
  if (idxA === -1) idxA = 999;
  if (idxB === -1) idxB = 999;
  
  if (idxA !== idxB) return idxA - idxB;
  return a.name.localeCompare(b.name);
});

// Convert to string and write
const output = `export const initialEndpoints = ${JSON.stringify(endpoints, null, 2)};\n`;
fs.writeFileSync('./store/initialEndpoints.ts', output, 'utf8');
console.log('Successfully generated initialEndpoints.ts with ' + endpoints.length + ' endpoints.');

